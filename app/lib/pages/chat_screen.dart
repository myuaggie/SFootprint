import 'package:flutter/material.dart';
import 'package:sfootprint/models/chat_model.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/models/login_model.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:sfootprint/shared/user_util.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sfootprint/shared/chat_util.dart';
import 'package:sfootprint/pages/chat_detail.dart';

class ChatScreen extends StatefulWidget{

  ChatScreenState createState(){
    return new ChatScreenState();
  }
}

class ChatScreenState extends State<ChatScreen>{

  UserModel me;
  LoginToken _token;
  List<UserModel> _peers;

  void initState(){
    super.initState();
  }

  Widget _buildEmptyMessage(BuildContext context,UserModel peer){
    return new ListTile(
        leading: new CircleAvatar(
          foregroundColor: Theme
              .of(context)
              .primaryColor,
          backgroundColor: Colors.grey,
          backgroundImage: me.type ? new NetworkImage(
              peer.teacher.avatarUrl)
              : new NetworkImage(peer.student.avatarUrl),
        ),
        title: new Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              new Text(me.type ? peer.teacher.name : peer.student.name,
                style: new TextStyle(fontWeight: FontWeight.bold),
              )
            ]
        ),
        subtitle: new Container(
          padding: const EdgeInsets.only(top: 5.0),
          child: new Text(
            'Not message yet',
            style: new TextStyle(color: Colors.grey, fontSize: 15.0),
          ),
        ),
      onTap: (){
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => ChatDetail(
                  user1: me,
                  user2: peer,
                )));
      },
    );
  }

  Widget _buildMessage(BuildContext context,snapshot, UserModel peer){
    return new ListTile(
      leading: new CircleAvatar(
        foregroundColor: Theme
            .of(context)
            .primaryColor,
        backgroundColor: Colors.grey,
        backgroundImage: me.type ? new NetworkImage(
            peer.teacher.avatarUrl)
            : new NetworkImage(peer.student.avatarUrl),
      ),
      title: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          new Text(
            me.type ? peer.teacher.name : peer.student.name,
            style: new TextStyle(fontWeight: FontWeight.bold),
          ),
          new Text(
            "${DateTime.fromMillisecondsSinceEpoch(int.parse(snapshot.data.documents[0]['timestamp'])).year.toString()}-"
                "${DateTime.fromMillisecondsSinceEpoch(int.parse(snapshot.data.documents[0]['timestamp'])).month.toString().padLeft(2, '0')}-"
                "${DateTime.fromMillisecondsSinceEpoch(int.parse(snapshot.data.documents[0]['timestamp'])).day.toString().padLeft(2, '0')}",
            style: new TextStyle(color: Colors.grey, fontSize: 14.0),
          ),
        ],
      ),
      subtitle: new Container(
        padding: const EdgeInsets.only(top: 5.0),
        child: new Text(
          snapshot.data.documents[0]['content'],
          style: new TextStyle(color: Colors.grey, fontSize: 15.0),
        ),
      ),
      onTap: (){
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => ChatDetail(
                  user1: me,
                  user2: peer,
                )));
      },
    );
  }

  Widget build(BuildContext context){
    if (_token==null) {
      final loginModel = ScopedModel.of<LoginModel>(context);
      _token = loginModel.token;
      me = UserUtil.getUserBy(_token.id, _token.type);
    }
    //final peerModel =ScopedModel.of<PeerModel>(context);
    //setState(() {
    //  _peers=peerModel.peers;
    //});

    print("peers len:"+_peers.length.toString());
    //String meId=me.type?'s'+me.student.id:'t'+me.teacher.id;
    return StreamBuilder(
      stream: Firestore.instance.collection('peers').document(ChatUtil.getUserId(me)).snapshots(),
        builder: (context,snapshot){
          if (!snapshot.hasData){
            return Center(
                child: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(Colors.blue)));
          }
          else {

            if (!snapshot.data.exists){
              return new Container();
            }
            return new ListView.builder(
              itemCount: snapshot.data['peers'].length,
              itemBuilder: (context, i) => new Column(
                children: <Widget>[
                  new Divider(
                    height: 10.0,
                  ),
                  StreamBuilder(
                      stream: Firestore.instance
                          .collection('messages')
                          .document(ChatUtil.getGroupId(me, ChatUtil.getModel(me, snapshot.data['peers'][i])))
                          .collection(ChatUtil.getGroupId(me, ChatUtil.getModel(me, snapshot.data['peers'][i])))
                          .orderBy('timestamp', descending: true)
                          .limit(1)
                          .snapshots(),
                      builder: (context, snapshot1) {
                        if (!snapshot1.hasData||snapshot1.data.documents.length==0) {
                          print("no message data");
                          return _buildEmptyMessage(context,ChatUtil.getModel(me, snapshot.data['peers'][i]));
                        } else {
                          print("has message data");
                          return _buildMessage(context,snapshot1,ChatUtil.getModel(me, snapshot.data['peers'][i]));
                        }
                      }
                  )
                ],
              ),
            );
          }
        },
    );
  }
}