import 'package:flutter/material.dart';
import 'package:sfootprint/models/notice_model.dart';
import 'package:sfootprint/pages/notice_detail.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/models/login_model.dart';
import 'package:sfootprint/shared/user_util.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class NoticeScreen extends StatefulWidget{

  NoticeScreenState createState(){
    return new NoticeScreenState();
  }
}

class NoticeScreenState extends State<NoticeScreen>{
  UserModel me;
  LoginToken _token;

  //version 1.5
//  Widget _buildNoticeList(context, testNoticeData){
//    return new ListView.builder(
//        itemCount: testNoticeData.length,
//        itemBuilder: (context, i) => new Dismissible(
//          key: new Key(testNoticeData[i].id),
//          onDismissed:(direction){
//            testNoticeData.removeAt(i);
//          },
//          background: new Container(
//            padding: const EdgeInsets.all(20.0),
//            child:new Text('Delete',
//                textAlign:TextAlign.end,
//                style:new TextStyle(color: Colors.white,
//                    fontSize: 24,fontFamily:"Roboto"
//                )),
//            color:Colors.red,
//          ),
//          child:
//          new Column(
//            children: <Widget>[
//              new Divider(
//                height: 10.0,
//              ),
//              new ListTile(
//                title: new Row(
//                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                  children: <Widget>[
//                    new Text(
//                      testNoticeData[i].title,
//                      style: new TextStyle(fontWeight: FontWeight.bold),
//                    ),
//                    new Text(
//                      "${testNoticeData[i].time.year.toString()}-${testNoticeData[i].time.month.toString().padLeft(2,'0')}-${testNoticeData[i].time.day.toString().padLeft(2,'0')}",
//                      style: new TextStyle(color: Colors.grey, fontSize: 14.0),
//                    ),
//                  ],
//                ),
//                subtitle: new Column(
//                  crossAxisAlignment: CrossAxisAlignment.start,
//                  children: <Widget>[
//                    new Text(
//                      "From: "+testNoticeData[i].senderName,
//                      style: new TextStyle(color: Colors.grey, fontSize: 15.0),
//                    ),
//                  ],
//                ),
//                onTap: () {
//                  Navigator.push(
//                      context, MaterialPageRoute(builder: (context) => NoticeDetail(notice:testNoticeData[i])));
//                },
//              )
//            ],
//          ),)
//    );
//  }

  Widget _buildNoticeListPersonal(context, List<DocumentSnapshot> testNoticeData){
    return new ListView.builder(
        itemCount: testNoticeData.length,
        itemBuilder: (context, i) => new Dismissible(
          key: new Key(testNoticeData[i].data['id']),
          onDismissed:(direction){
            Firestore.instance.collection('notice').document(me.type?'s'+me.student.id:'t'+me.teacher.id).delete();
            //testNoticeData.removeAt(i);
          },
          background: new Container(
            padding: const EdgeInsets.all(20.0),
            child:new Text('Delete',
                textAlign:TextAlign.end,
                style:new TextStyle(color: Colors.white,
                    fontSize: 24,fontFamily:"Roboto"
                )),
            color:Colors.red,
          ),
          child:
          new Column(
            children: <Widget>[
              new Divider(
                height: 10.0,
              ),
              new ListTile(
                title: new Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    new Text(
                      testNoticeData[i].data['title'],
                      style: new TextStyle(fontWeight: FontWeight.bold),
                    ),
                    new Text(
                      "${DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time'])).year.toString()}-"
                          "${DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time'])).month.toString().padLeft(2, '0')}-"
                          "${DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data[0]['time'])).day.toString().padLeft(2, '0')}",
                      style: new TextStyle(color: Colors.grey, fontSize: 14.0),
                    ),
                  ],
                ),
                subtitle: new Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    new Text(
                      "From: "+testNoticeData[i].data['senderName'],
                      style: new TextStyle(color: Colors.grey, fontSize: 15.0),
                    ),
                  ],
                ),
                onTap: () {
                  NoticeModel model= new NoticeModel(id:testNoticeData[i].data['id'],
                      senderName:testNoticeData[i].data['senderName'],
                      title:testNoticeData[i].data['title'],  message:testNoticeData[i].data['message'],
                      time:DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time']))
                  );
                  Navigator.push(
                      context, MaterialPageRoute(builder: (context) => NoticeDetail(
                      notice: model)));
                },
              )
            ],
          ),)
    );
  }

  Widget _buildNoticeListGoal(context, List<DocumentSnapshot> testNoticeData){
    return new ListView.builder(
        itemCount: testNoticeData.length,
        itemBuilder: (context, i) => new Dismissible(
          key: new Key(testNoticeData[i].data['id']),
          child:
          new Column(
            children: <Widget>[
              new Divider(
                height: 10.0,
              ),
              new ListTile(
                title: new Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    new Text(
                      testNoticeData[i].data['title'],
                      style: new TextStyle(fontWeight: FontWeight.bold),
                    ),
                    new Text(
                      "${DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time'])).year.toString()}-"
                          "${DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time'])).month.toString().padLeft(2, '0')}-"
                          "${DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time'])).day.toString().padLeft(2, '0')}",
                      style: new TextStyle(color: Colors.grey, fontSize: 14.0),
                    ),
                  ],
                ),
                subtitle: new Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    new Text(
                      "From: "+testNoticeData[i].data['senderName'],
                      style: new TextStyle(color: Colors.grey, fontSize: 15.0),
                    ),
                  ],
                ),
                onTap: () {
                  NoticeModel model= new NoticeModel(id:testNoticeData[i].data['id'],
                      senderName:testNoticeData[i].data['senderName'],
                      title:testNoticeData[i].data['title'],  message:testNoticeData[i].data['message'],
                      time:DateTime.fromMillisecondsSinceEpoch(int.parse(testNoticeData[i].data['time']))
                  );
                  Navigator.push(
                      context, MaterialPageRoute(builder: (context) => NoticeDetail(
                      notice: model)));
                },
              )
            ],
          ),)
    );
  }


  Widget _buildGoalNotice(BuildContext context){
    return (
        StreamBuilder(
          stream: Firestore.instance
              .collection('notice')
              .document(me.student.careerGoal)
              .collection(me.student.careerGoal)
              .orderBy('time', descending: true)
              .limit(20)
              .snapshots(),
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return Center(
                  child: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(Colors.blue)));
            } else {
              //listMessage = snapshot.data.documents;
              return _buildNoticeListGoal(context, snapshot.data.documents);
            }
          },
        )
    );
  }

  Widget build(BuildContext context){
    if (_token==null) {
      final loginModel = ScopedModel.of<LoginModel>(context);
      _token = loginModel.token;
      me = loginModel.model;
    }
//    if (me.type){
//      return _buildNoticeList(context, testNoticeData);
//    }
//    else {
//      return _buildNoticeList(context, testNoticeData2);
//    }
    if (me.type){
      return _buildGoalNotice(context);
    }
    else {
      return Container();
    }
  }
}