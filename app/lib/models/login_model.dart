import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sfootprint/models/settings_model.dart';

class LoginModel extends Model{
  LoginToken _token;
  UserModel _model;

  get token => _token;
  get model => _model;

  void login(String id, int type, UserModel me){
    _token=LoginToken(id, type);
    _model=me;
  }

  void update(UserModel userModel){
    _model=userModel;
    notifyListeners();
  }

  void logout(){
    _token=null;
    _model=null;
    notifyListeners();
  }
}