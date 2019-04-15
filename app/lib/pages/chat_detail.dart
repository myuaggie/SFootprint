import 'package:flutter/material.dart';
import 'package:sfootprint/models/chat_model.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart';
import 'package:sfootprint/shared/chat_util.dart';

class ChatDetail extends StatefulWidget{
  ChatDetail({Key key,@required this.user1, @required this.user2}): super(key:key);

   final UserModel user1; //me
   final UserModel user2;

  ChatDetailState createState() {
    return new ChatDetailState();
  }
}

class ChatDetailState extends State<ChatDetail>{

  String groupId;
  String userId1; //me
  String userId2;
  ScrollController _listScrollController;
  TextEditingController _textEditingController;

  void initState(){
    _listScrollController=new ScrollController();
    _textEditingController=new TextEditingController();
    super.initState();
    groupId=ChatUtil.getGroupId(widget.user1, widget.user2);
    userId1=ChatUtil.getUserId(widget.user1);
    userId2=ChatUtil.getUserId(widget.user2);
  }

  void _onSendMessage(String content){
    if (content.trim() != '') {
      _textEditingController.clear();

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
      });

      Firestore.instance.collection('peers').
      document(userId2).get().then((res){
          List<String> peers2=new List<String>();
          peers2.add(userId1);
          if (res.exists) {
            List<String> old= res.data['peers'].cast<String>();
            for (String o in old){
              if (o!=userId1) peers2.add(o);
            }
          }
          Firestore.instance.collection('peers')
              .document(userId2).setData({'peers':peers2});
    });

      var documentReference = Firestore.instance
          .collection('messages')
          .document(groupId)
          .collection(groupId)
          .document(DateTime
          .now()
          .millisecondsSinceEpoch
          .toString());

      Firestore.instance.runTransaction((transaction) async {
        await transaction.set(
          documentReference,
          {
            'idFrom': userId1,
            'idTo': userId2,
            'timestamp': DateTime
                .now()
                .millisecondsSinceEpoch
                .toString(),
            'content': content,
          },
        );
      });
      _listScrollController.animateTo(
          0.0, duration: Duration(milliseconds: 300), curve: Curves.easeOut);
    }
  }

  Widget _buildItem(int index, DocumentSnapshot document){
    if (document['idFrom'] == userId1) {
      return Container(
        alignment: Alignment.bottomRight,
        child: Row(
            children: <Widget>[
              Expanded(child:new Container(),flex:50),
              Container(
                child:Text(
                  document['content'],
                  style: TextStyle(color: Colors.white),
                ),
                padding: EdgeInsets.fromLTRB(15.0, 10.0, 15.0, 10.0),
                decoration: BoxDecoration(
                    color: Colors.blue, borderRadius: BorderRadius.circular(8.0)),
                margin: EdgeInsets.only(bottom: 10.0, right: 10.0),
              ),
              new CircleAvatar(
                foregroundColor: Theme
                    .of(context).primaryColor,
                backgroundColor: Colors.grey,
                backgroundImage: widget.user1.type ? new NetworkImage(
                    widget.user1.student.avatarUrl)
                    : new NetworkImage(widget.user1.teacher.avatarUrl),
              ),
            ]
        )
      );
    }
    else {
      return Container(
        child: Row(
          children: <Widget>[
            new CircleAvatar(
              foregroundColor: Theme
                  .of(context)
                  .primaryColor,
              backgroundColor: Colors.grey,
              backgroundImage: widget.user2.type ? new NetworkImage(
                  widget.user2.student.avatarUrl)
                  : new NetworkImage(widget.user2.teacher.avatarUrl),
            ),
            Container(
              child:Text(
                document['content'],
                style: TextStyle(color: Colors.white),
              ),
              padding: EdgeInsets.fromLTRB(15.0, 10.0, 15.0, 10.0),
              decoration: BoxDecoration(color: Colors.grey, borderRadius: BorderRadius.circular(8.0)),
              margin: EdgeInsets.only(left: 10.0,bottom:10.0),
            ),
            Expanded(child:new Container(),flex:50),
          ],
        )
      );
    }
  }

  Widget _buildInput() {
    return Container(
        padding: EdgeInsets.fromLTRB(20, 10, 10, 10),
        child:Row(
        children: <Widget>[
          Flexible(
            child: Container(
              child: TextField(
                style: TextStyle(color: Colors.grey, fontSize: 15.0),
                controller: _textEditingController,
              ),
            ),
          ),
          Material(
            child: new Container(
              margin: new EdgeInsets.symmetric(horizontal: 8.0),
              child: new IconButton(
                icon: new Icon(Icons.send),
                onPressed: () => _onSendMessage(_textEditingController.text),
                color: Colors.blue,
              ),
            ),
            color: Colors.white,
          ),
        ],
      ),
    );
  }

  Widget _buildListMessage(){
    return (
        StreamBuilder(
          stream: Firestore.instance
              .collection('messages')
              .document(groupId)
              .collection(groupId)
              .orderBy('timestamp', descending: true)
              .limit(20)
              .snapshots(),
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return Center(
                  child: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(Colors.blue)));
            } else {
              //listMessage = snapshot.data.documents;
              return Container(
                child: ListView.builder(
                  shrinkWrap: true,
                  padding: EdgeInsets.all(10.0),
                  itemBuilder: (context, index) => _buildItem(index, snapshot.data.documents[index]),
                  itemCount: snapshot.data.documents.length,
                  reverse: true,
                  controller: _listScrollController,
                ),
              );
            }
          },
        )
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: InkWell(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back, color: Colors.white),
          ),
          title: new Text(widget.user2.type?widget.user2.student.name:widget.user2.teacher.name),
        ),
        body: new Column(
          children: <Widget>[
            Expanded(child:_buildListMessage(),flex:80),
            Expanded(child:_buildInput(),flex:20)
          ],
        )
    );
  }
}