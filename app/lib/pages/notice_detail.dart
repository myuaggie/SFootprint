import 'package:flutter/material.dart';
import 'package:sfootprint/models/notice_model.dart';

class NoticeDetail extends StatelessWidget{
  NoticeDetail({Key key,@required this.notice}): super(key:key);

  final NoticeModel notice;

  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        leading: InkWell(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back, color: Colors.white),
          ),
        title: new Text(notice.title),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          new Container(
            padding: const EdgeInsets.all(5.0),
            alignment: Alignment.centerRight,
            child: new Text("${notice.time.year.toString()}-${notice.time.month.toString().padLeft(2,'0')}-${notice.time.day.toString().padLeft(2,'0')}",
              textAlign: TextAlign.end,
            ),
          ),
          new Divider(
            height: 2.0,
          ),
          new Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.all(10.0),
            child: new Text("From "+notice.senderName+":"),
          ),
          new Divider(
            height: 5.0,
          ),
          new Container(
            padding: const EdgeInsets.all(20.0),
            child: new Text(notice.message),
          ),
        ],
      )
    );
  }
}