import 'package:flutter/material.dart';
import 'package:sfootprint/pages/chat_screen.dart';
import 'package:sfootprint/pages/notice_sreen.dart';
import 'package:sfootprint/pages/settings_screen.dart';
import 'package:sfootprint/pages/login_screen.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/models/login_model.dart';
import 'package:sfootprint/shared/user_util.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:sfootprint/models/chat_model.dart';
import 'package:sfootprint/shared/chat_util.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SFootprintHome extends StatefulWidget {

  SFootprintHome();

  _SFootprintHomeState createState() => new _SFootprintHomeState();
}

class _SFootprintHomeState extends State<SFootprintHome>
    with SingleTickerProviderStateMixin{
  TabController _tabController;
  List<UserModel> students=new List<UserModel>();
  List<UserModel> teachers=new List<UserModel>();

  UserModel me;
  LoginToken _token;

  void initState(){
    super.initState();
    _tabController = new TabController(length: 3, vsync: this, initialIndex: 1);
    Firestore.instance.collection('student').getDocuments().then((snapshot){
      List<UserModel> _students=new List<UserModel>();
      for (DocumentSnapshot res in snapshot.documents){
        _students.add(UserModel(true, StudentModel(res.data['id'].toString(), res.data['realName'],
            res.data['name'], res.data['grade'], res.data['major'], res.data['careerGoal'],
            res.data['phone'], res.data['email'], res.data['avatarUrl']), null));
      }
      setState(() {
        students=_students;
      });
    });
    Firestore.instance.collection('teacher').getDocuments().then((snapshot){
      List<UserModel> _teachers=new List<UserModel>();
      for (DocumentSnapshot res in snapshot.documents){
        _teachers.add(UserModel(false, null, TeacherModel(res.data['id'].toString(), res.data['realName'],
            res.data['name'], res.data['position'], res.data['major'], res.data['detail'],
            res.data['phone'], res.data['email'], res.data['avatarUrl'])));
      }
      setState(() {
        teachers=_teachers;
      });
    });
//    students=UserUtil.getUserList(0);
//    teachers=UserUtil.getUserList(1);
  }

  void _createGroup(UserModel user1, UserModel user2,BuildContext context){
    print("create group");
    String groupId = ChatUtil.getGroupId(user1, user2);
    String userId1 = user1.type ? 's'+user1.student.id : 't'+user1.teacher.id;
    String userId2 = user2.type ? 's'+user2.student.id : 't'+user2.teacher.id;
    print("groupId:"+groupId);
    print("userId1"+userId1);
    print("userId2"+userId2);

    Firestore.instance.collection('peers').
    document(userId1).get().then((res){
      List<String> peers1=new List<String>();
      peers1.add(userId2);
      if (res.exists) {
        List<String> old= res.data['peers'].cast<String>();
        for (String o in old){
          if (o!=userId2) peers1.add(o);
        }
      }
      Firestore.instance.collection('peers')
          .document(userId1).setData({'peers':peers1});
      List<UserModel> result=ChatUtil.getModelsByIds(me, peers1);
    });
  }

  void _showUserList(){
    final loginModel = ScopedModel.of<LoginModel>(context);
    _token = loginModel.token;
    me=loginModel.model;
    showDialog(
        context: context,
        builder: (BuildContext context){
          return SimpleDialog(
            title: new Text("Create New Chat",style: new TextStyle(fontSize: 20.0,color:Colors.blue),),
            children: <Widget>[
                  Container(
                    height:300,
                    width: 400,
                    child:
                    new ListView.builder(
                      itemCount: me.type?teachers.length:students.length,
                      shrinkWrap: true,
                      itemBuilder: (context, i) => new Column(
                    children: <Widget>[
                      new Divider(
                        height: 10.0,
                      ),
                      new ListTile(
                        leading: new CircleAvatar(
                          foregroundColor: Theme.of(context).primaryColor,
                          backgroundColor: Colors.grey,
                          backgroundImage: new NetworkImage(me.type?
                          teachers[i].teacher.avatarUrl:students[i].student.avatarUrl
                          ),
                        ),
                        title: new Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Expanded(child:new Text(
                              me.type?
                              teachers[i].teacher.name:students[i].student.name,
                              style: new TextStyle(fontWeight: FontWeight.bold),
                            )),
                            Expanded(child:new Text(
                              me.type?
                              teachers[i].teacher.realName:students[i].student.realName,
                              style: new TextStyle(color: Colors.grey, fontSize: 15.0),
                            )),
                          ],
                        ),
                        subtitle: new Container(
                          height:40,
                         // alignment: Alignment.centerLeft,
                          padding: const EdgeInsets.only(top: 5.0),
                          child: new Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Expanded(child:new Text(
                                me.type?
                                teachers[i].teacher.position:students[i].student.grade,
                                style: new TextStyle(color: Colors.grey, fontSize: 15.0),
                              )),
                              Expanded(child:new Text(
                                "Major:${me.type?
                                teachers[i].teacher.major:students[i].student.major}",
                                style: new TextStyle(color: Colors.grey, fontSize: 15.0),
                              )),
                            ],
                          )
                        ),
                        trailing: InkWell(
                          onTap: () {
                            if (me.type){
                              _createGroup(me, teachers[i],context);
                            }
                            else {
                              _createGroup(me, students[i],context);
                            }
                          },
                          child: Icon(Icons.add, color: Colors.blue),
                        ),
                      )
                    ],
                  ),
                ),)
                ],
          );
        }
    );
  }

  void _initPeers(UserModel me, BuildContext context){
    String meId=me.type?'s'+me.student.id:'t'+me.teacher.id;
    Firestore.instance.collection('peers').
    document(meId).get().then((res){
      if (res.exists){
        print("has peers");
        List<String> peers=res.data['peers'].cast<String>();
        List<UserModel> result=ChatUtil.getModelsByIds(me, peers);
      }
      else {
        print("no peers");
        List<UserModel> result=new List<UserModel>();
      }
    });
  }

  Widget build(BuildContext context){
    if (_token==null) {
      final loginModel = ScopedModel.of<LoginModel>(context);
      _token = loginModel.token;
      if (_token==null){
        return LoginScreen();
      }
      me = loginModel.model;
      _initPeers(me, context);
    }
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("SFootprint"),
        leading: InkWell(
          onTap: () {
            final loginModel = ScopedModel.of<LoginModel>(context);
            loginModel.logout();
//            final peerModel = ScopedModel.of<PeerModel>(context);
//            peerModel.clearPeers();
            Navigator.of(context).pushNamed('/login');
          },
          child: Icon(Icons.exit_to_app, color: Colors.white),
        ),
        elevation: 0.7,
        bottom: new TabBar(
          controller: _tabController,
          indicatorColor: Colors.white,
          tabs: <Widget>[
            new Tab(text: "Notice"),
            new Tab(text: "Chat"),
            new Tab(text: "Settings"),
          ],
        ),
      ),
      body: new TabBarView(
        controller: _tabController,
        children: <Widget>[
          NoticeScreen(),
          ChatScreen(teacherList:teachers,studentList:students),
          SettingsScreen(),
        ],
      ),
      floatingActionButton: new FloatingActionButton(
        backgroundColor: Colors.amberAccent,
        child: new Icon(
          Icons.add,
          color: Colors.white,
        ),
        onPressed: _showUserList,
      ),
    );
  }
}