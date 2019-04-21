import 'package:flutter/material.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/models/login_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sfootprint/models/settings_model.dart';

class LoginScreen extends StatefulWidget{

  LoginScreenState createState(){
    return new LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen>{

  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  String _id;
  LoginModel loginModel;

  void login(String id, int type, BuildContext context){
    if (type==0) {
      Firestore.instance.collection('student').document(id).get().then((res) {
        if (res.exists) {
          UserModel me = UserModel(true, StudentModel(res.data['id'], res.data['realName'],
              res.data['name'], res.data['grade'], res.data['major'], res.data['careerGoal'],
              res.data['phone'], res.data['email'], res.data['avatarUrl']), null);
          loginModel.login(id,type,me);
          _formKey.currentState.reset();
          Navigator.of(context).pushNamed('/home');
        }
        else {
          _formKey.currentState.reset();
        }
      });
    }
    else {
      Firestore.instance.collection('teacher').document(id).get().then((res) {
        if (res.exists) {
          UserModel me = UserModel(false, null, TeacherModel(res.data['id'], res.data['realName'],
              res.data['name'], res.data['position'], res.data['major'], res.data['detail'],
              res.data['phone'], res.data['email'], res.data['avatarUrl']));
          loginModel.login(id,type,me);
          _formKey.currentState.reset();
          Navigator.of(context).pushNamed('/home');
        }
        else {
          _formKey.currentState.reset();
        }
      });
    }
  }
  Widget build(BuildContext context){
    loginModel = ScopedModel.of<LoginModel>(context);

    return Scaffold(
      appBar: AppBar(
        leading: InkWell(
          onTap: () {
          },
          child: Icon(Icons.star, color: Colors.white),
        ),
        title: new Text('Login'),
      ),
      body:Column(
        children: <Widget>[
      Container(
        padding: EdgeInsets.all(20),
      child:new Text("SFootprint",style:new TextStyle(fontSize: 28.0,color:Colors.blue))),
          Card(
        margin: EdgeInsets.all(20),
        child: new Form(
          key:_formKey,
          child: Container(
              padding:EdgeInsets.all(20),child:new Column(
            children: <Widget>[
              new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "id", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  onSaved: (String value) {
                    _id = value;
                  }
              ),
              new Row(
                children: <Widget>[
                  Expanded(child:new MaterialButton(
                    color: Colors.blue[400],
                    onPressed: (){
                      _formKey.currentState.save();
                      login(_id,0,context);
                    },
                    child: new Text('Student Login'),
                  )),
                    Expanded(child:new MaterialButton(
                    color: Colors.grey[200],
                    onPressed: (){
                      _formKey.currentState.save();
                      final loginModel = ScopedModel.of<LoginModel>(context);
                      login(_id,1,context);
                    },
                    child: new Text('Teacher Login'),
                  )),
                ],
              )
            ],
          ))
        )
    )]));
  }
}