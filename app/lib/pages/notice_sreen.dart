import 'package:flutter/material.dart';
import 'package:sfootprint/models/notice_model.dart';
import 'package:sfootprint/pages/notice_detail.dart';
import 'package:sfootprint/shared/login_util.dart';

class NoticeScreen extends StatefulWidget{

  NoticeScreenState createState(){
    return new NoticeScreenState();
  }
}

class NoticeScreenState extends State<NoticeScreen>{
  Widget build(BuildContext context){
    return new ListView.builder(
      itemCount: testNoticeData.length,
      itemBuilder: (context, i) => new Dismissible(
        key: new Key(testNoticeData[i].id),
        onDismissed:(direction){
          testNoticeData.removeAt(i);
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
                  testNoticeData[i].title,
                  style: new TextStyle(fontWeight: FontWeight.bold),
                ),
                new Text(
                  "${testNoticeData[i].time.year.toString()}-${testNoticeData[i].time.month.toString().padLeft(2,'0')}-${testNoticeData[i].time.day.toString().padLeft(2,'0')}",
                  style: new TextStyle(color: Colors.grey, fontSize: 14.0),
                ),
              ],
            ),
            subtitle: new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                new Text(
                  "From: "+testNoticeData[i].senderName,
                  style: new TextStyle(color: Colors.grey, fontSize: 15.0),
                ),
//                new Text(
//                  testNoticeData[i].message,
//                  style: new TextStyle(color: Colors.grey, fontSize: 15.0),
//                ),
              ],
            ),
              onTap: () {
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => NoticeDetail(notice:testNoticeData[i])));
            },
          )
        ],
      ),)
    );
  }
}