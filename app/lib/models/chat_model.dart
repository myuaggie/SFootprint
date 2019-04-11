import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:scoped_model/scoped_model.dart';

class ChatModel {
  final String name;
  final String message;
  final DateTime time;
  final String avatarUrl;

  ChatModel({this.name, this.message, this.time, this.avatarUrl});
}

class MessageModel {
  final String from;
  final String to;
  final DateTime time;
  final String content;
  final String type;
  MessageModel(this.from,this.to,this.time,this.content,this.type);
}

class PeerModel extends Model{
  List<UserModel> _peers=new List<UserModel>();

  get peers => _peers;

  void addPeer(UserModel u){
    if (!_peers.contains(u)) {
      _peers.add(u);
      notifyListeners();
    }
  }

  void setPeers(List<UserModel> us){
    _peers=us;
    notifyListeners();
  }

  void clearPeers(){
    _peers=new List<UserModel>();
  }

}
List<ChatModel> testChatData = [
  new ChatModel(
    name: "Pawan Kumar",
    message: "Hey Flutter, You are so amazing !",
    time: new DateTime(2019,4,1,9),
    avatarUrl:
    "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/suits_cast_harvey.jpg?itok=fpTOeeBb"
  ),
  new ChatModel(
    name: "Harvey Spectre",
    message: "Hey I have hacked whatsapp!",
    time: new DateTime(2019,4,2,8),
    avatarUrl:
    "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/suits_cast_harvey.jpg?itok=fpTOeeBb"
  ),
];