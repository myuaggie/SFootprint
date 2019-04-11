import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/shared/login_util.dart';


class LoginModel extends Model{
  LoginToken _token;

  get token => _token;

  void login(String id, int type){
    _token=LoginToken(id, type);
    notifyListeners();
  }

  void logout(){
    _token=null;
    notifyListeners();
  }
}