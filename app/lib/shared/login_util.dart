import 'package:shared_preferences/shared_preferences.dart';

class LoginToken{
  final String id;
  final int type;
  LoginToken(this.id, this.type);
}

class LoginUtil{

  static void login(String id, int type) async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.setString("id", id);
    sp.setInt("type",type);
  }

  static void logout() async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.remove("id");
    sp.remove("type");
  }

  static Future<LoginToken> getState() async{
    SharedPreferences sp = await SharedPreferences.getInstance();
    if (sp.get("id")==null) return null;
    return LoginToken(sp.get("id"),sp.get("type"));
  }

}