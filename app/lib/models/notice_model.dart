class NoticeModel {
  final String id;
  final String senderName;
  final String title;
  final String message;
  final DateTime time;

  NoticeModel({this.id,this.senderName, this.title, this.message, this.time});
}

List<NoticeModel> testNoticeData = [
  new NoticeModel(
    id:'n1',
    senderName: 'teacher1',
    title: 'title1',
    message: 'message1',
    time: new DateTime(2017,8,16,21),
  ),
  new NoticeModel(
    id:'n2',
    senderName: 'teacher2',
    title: 'title2',
    message: 'message2',
    time: new DateTime(2019,4,1,9),
  ),
];


