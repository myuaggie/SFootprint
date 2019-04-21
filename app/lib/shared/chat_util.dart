import 'package:shared_preferences/shared_preferences.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PeerUtil{

  static void addPeer(String id) async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    List<String> peers=sp.getStringList("peers");
    if (!peers.contains(id)) peers.add(id);
    sp.setStringList("peers", peers);
  }

  static Future<List<UserModel>> getStudentPeers() async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    List<String> peers=sp.getStringList("peers");
    List<UserModel> l=new List<UserModel>();
    for (String id in peers){
      l.add(UserModel(true, testStudentData[int.parse(id)],null));
    }
    return l;
  }

  static Future<List<UserModel>> getTeacherPeers() async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    List<String> peers=sp.getStringList("peers");
    List<UserModel> l=new List<UserModel>();
    for (String id in peers){
      l.add(UserModel(false, null, testTeacherData[int.parse(id)]));
    }
    return l;
  }
}

class ChatUtil{

  static String getUserId(UserModel user){
    return user.type?'s'+user.student.id:'t'+user.teacher.id;
  }

  static String getGroupId(UserModel user1, UserModel user2){
    String userId1=user1.type?'s'+user1.student.id:'t'+user1.teacher.id;
    String userId2=user2.type?'s'+user2.student.id:'t'+user2.teacher.id;
    if (user1.type){
      return '$userId1-$userId2';
    }
    else {
      return '$userId2-$userId1';
    }
  }

  static UserModel getModel(UserModel me, String id, List<UserModel> teachers, List<UserModel> students){
    if (me.type){
      for (UserModel t in teachers){
        if ('t'+t.teacher.id==id){
          return t;

        }
      }
    }
    else {
      for (UserModel s in students){
        if ('s'+s.student.id==id){
          return s;
        }
      }
    }
    return null;
  }

  static List<UserModel> getModelsByIds(UserModel me, List<String> peers){
    List<UserModel> l=new List<UserModel>();
    if (me.type){
      for (String id in peers){
        for (TeacherModel t in testTeacherData){
          if ('t'+t.id==id){
            l.add(UserModel(false, null,t));
            break;
          }
        }
      }
    }
    else {
      for (String id in peers){
        for (StudentModel s in testStudentData){
          if ('s'+s.id==id){
            l.add(UserModel(true, s,null));
          }
        }
      }
    }
    return l;
  }

  static List<UserModel> getPeers(UserModel me) {
    String meId=me.type?'s'+me.student.id:'t'+me.teacher.id;
    Firestore.instance.collection('peers').
    document(meId).collection(meId)
        .orderBy('timestamp', descending: true)
        .limit(1).getDocuments().then((res){
      List<DocumentSnapshot> ds = res.documents;
      List<String> peers;
      if (ds.length!=0) peers= ds[0].data['peers'];
      else peers=new List<String>();
      List<UserModel> result=getModelsByIds(me, peers);
      return result;
    });



  }

  static void createGroup(UserModel user1, UserModel user2){
    print("create group");
    String groupId = getGroupId(user1, user2);
    String userId1 = user1.type ? 's'+user1.student.id : 't'+user1.teacher.id;
    String userId2 = user2.type ? 's'+user2.student.id : 't'+user2.teacher.id;
//    final QuerySnapshot result1 =
//    await Firestore.instance.collection('peers').
//    document(userId1).collection(userId1)
//        .orderBy('timestamp', descending: true)
//        .limit(1).getDocuments();
//    List<DocumentSnapshot> ds = result1.documents;
//
//    List<String> peers1;
//    if (ds.length!=0) peers1= ds[0].data['peers'];
//    else peers1=new List<String>();
//    if (peers1.contains(userId2)) peers1.remove(userId2);
//    peers1.insert(0, userId2);
//    print("self new peer size:"+peers1.length.toString());
//    var documentReference1 =Firestore.instance.collection('peers')
//        .document(userId1).collection(userId1)
//        .document(DateTime
//        .now()
//        .millisecondsSinceEpoch
//        .toString());
//
//    final QuerySnapshot result2 =
//    await Firestore.instance.collection('peers').
//    document(userId2).collection(userId2)
//        .orderBy('timestamp', descending: true)
//        .limit(1).getDocuments();
//    List<DocumentSnapshot> ds2 = result2.documents;
//    List<String> peers2;
//    if (ds2.length!=0) peers2= ds2[0].data['peers'];
//    else peers2=new List<String>();
//    if (peers2.contains(userId1)) peers2.remove(userId1);
//    peers2.insert(0, userId1);
//    print("peer new peer size:"+peers2.length.toString());
//    var documentReference2=Firestore.instance.collection('peers')
//        .document(userId2).collection(userId2)
//        .document(DateTime
//        .now()
//        .millisecondsSinceEpoch
//        .toString());

    var documentReference = Firestore.instance
        .collection('messages')
        .document(groupId)
        .collection(groupId)
        .document(DateTime
        .now()
        .millisecondsSinceEpoch
        .toString());


    Firestore.instance.runTransaction((transaction) async {
//      await transaction.set(
//          documentReference1,
//          {'peers': peers1});
//      await transaction.set(
//          documentReference2,
//          {'peers': peers2});
      await transaction.set(
        documentReference,
        {
          'idFrom': userId1,
          'idTo': userId2,
          'timestamp': DateTime
              .now()
              .millisecondsSinceEpoch
              .toString(),
          'content': "Create Chat",
        },
      );
    });

  }
}