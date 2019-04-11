import 'package:flutter/material.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/models/login_model.dart';

class LoginScreen extends StatefulWidget{

  LoginScreenState createState(){
    return new LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen>{

  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  String _id;

  Widget build(BuildContext context){
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
                      final loginModel = ScopedModel.of<LoginModel>(context);
                      loginModel.login(_id,0);
                      _formKey.currentState.reset();
                      Navigator.of(context).pushReplacementNamed('/home');
                    },
                    child: new Text('Student Login'),
                  )),
                    Expanded(child:new MaterialButton(
                    color: Colors.grey[200],
                    onPressed: (){
                      _formKey.currentState.save();
                      final loginModel = ScopedModel.of<LoginModel>(context);
                      loginModel.login(_id,1);
                      _formKey.currentState.reset();
                      Navigator.of(context).pushNamed('/home');
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