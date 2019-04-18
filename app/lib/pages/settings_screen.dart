import 'package:flutter/material.dart';
import 'package:sfootprint/models/settings_model.dart';
import 'package:sfootprint/shared/login_util.dart';
import 'package:sfootprint/shared/user_util.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/models/login_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SettingsScreen extends StatefulWidget {
  
  SettingsScreenState createState(){
    return new SettingsScreenState();
  }
}

class SettingsScreenState extends State<SettingsScreen>{
  bool _readonly=true;

  void initState(){
    super.initState();
  }

  void _toggle(){
    setState(() {
      _readonly=!_readonly;
    });
  }

  void _showMessage(String name) {
    showDialog(
        context: context,
        builder: (BuildContext context){
          return new AlertDialog(
              content: new Text(name),
              actions: <Widget>[
                new FlatButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                    child: new Text('OK')
                )
              ]
          );
        }
    );
  }

  Widget build(BuildContext context){
    if (_readonly){
      return  new Container(
        padding: EdgeInsets.all(8.0),
        margin: EdgeInsets.fromLTRB(10, 20, 10, 120),
        child: new Card(
          child:
          new SettingsReadOnly(onToggled:_toggle),
        ),
      );
    }
    else {
      return ListView(
        shrinkWrap: true,
        padding: EdgeInsets.all(15.0),
        children: <Widget>[
        Center(
        child:new Container(
              padding: EdgeInsets.all(8.0),
              child:new Card(
                child:
                  new SettingsEditor(onToggled:_toggle,showMessage:_showMessage),
              )
          ))]);
    }

  }
}

class SettingsReadOnly extends StatefulWidget {
  SettingsReadOnly({Key key, @required this.onToggled, this.showMessage}): super(key:key);

  final VoidCallback onToggled;
  final ValueSetter<String> showMessage;

  _SettingsReadOnlyState createState(){
    return new _SettingsReadOnlyState();
  }
}

class _SettingsReadOnlyState extends State<SettingsReadOnly>{
  
  UserModel me;
  LoginToken _token;
  void _toggleEdit(){
    widget.onToggled();
  }

  Widget _buildStudent(BuildContext context){
    return new Container(
        margin: EdgeInsets.fromLTRB(10, 20, 10, 20),
        child:new Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            new CircleAvatar(
              radius: 40,
              foregroundColor: Theme.of(context).primaryColor,
              backgroundColor: Colors.grey,
              backgroundImage: new NetworkImage(me.student.avatarUrl),
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Real Name:", style: new TextStyle(fontSize: 18.0),),
                new Text(me.student.realName, style: new TextStyle(fontSize: 18.0),)
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Name:", style: new TextStyle(fontSize: 18.0),),
                new Text(me.student.name, style: new TextStyle(fontSize: 18.0),)
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Major:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.student.major, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Grade:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.student.grade, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Phone:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.student.phone, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Email:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.student.email, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Career Goal:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.student.careerGoal, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new MaterialButton(
              color: Colors.green[500],
              onPressed: _toggleEdit,
              child: new Text('Edit'),
            ),
          ],
        )
    );
  }

  Widget _buildTeacher(context){
    return new Container(
        margin: EdgeInsets.fromLTRB(10, 20, 10, 20),
        child:new Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            new CircleAvatar(
              radius: 40,
              foregroundColor: Theme.of(context).primaryColor,
              backgroundColor: Colors.grey,
              backgroundImage: new NetworkImage(me.teacher.avatarUrl),
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Real Name:", style: new TextStyle(fontSize: 18.0),),
                new Text(me.teacher.realName, style: new TextStyle(fontSize: 18.0),)
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Name:", style: new TextStyle(fontSize: 18.0),),
                new Text(me.teacher.name, style: new TextStyle(fontSize: 18.0),)
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Major:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.teacher.major, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Position:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.teacher.position, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Phone:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.teacher.phone, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Email:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.teacher.email, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                new Text("Description:", style: new TextStyle(fontSize: 18.0)),
                new Text(me.teacher.detail, style: new TextStyle(fontSize: 18.0)),
              ],
            ),
            new MaterialButton(
              color: Colors.green[500],
              onPressed: _toggleEdit,
              child: new Text('Edit'),
            ),
          ],
        )
    );
  }

  Widget build(BuildContext context) {
    final loginModel = ScopedModel.of<LoginModel>(context);
    _token = loginModel.token;
    if (_token==null){
      return new Container();
    }
    me = loginModel.model;
    if (me.type==true){
      return _buildStudent(context);
    }
    else {
      return _buildTeacher(context);
    }
  }
}

class SettingsEditor extends StatefulWidget {
  SettingsEditor({Key key, @required this.onToggled, this.showMessage}): super(key:key);

  final VoidCallback onToggled;
  final ValueSetter<String> showMessage;

  _SettingsEditorState createState(){
    return new _SettingsEditorState();
  }
}

class _SettingsEditorState extends State<SettingsEditor>{

  String _name;
  String _careerGoal;
  String _detail;
  GlobalKey<FormState> _formKey = new GlobalKey<FormState>();

  UserModel me;
  LoginToken _token;

  LoginModel loginModel;
  
  Widget _buildDropdownButton(){
    return Padding(
      padding: const EdgeInsets.all(5.0),
      child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
      ListTile(
      title: const Text('Career Goal:'),
      trailing: DropdownButton<String>(
        value: _careerGoal,
        onChanged: (String newValue) {
          setState(() {
            _careerGoal = newValue;
          });
        },
        items: <String>[CareerGoal.IT, CareerGoal.Financial, CareerGoal.Math, CareerGoal.Music].map<DropdownMenuItem<String>>((String value) {
          return DropdownMenuItem<String>(
            value: value,
            child: Text(value),
          );
        }).toList(),
      ),
    ),]
    )
    );
  }
  void _toggleSave(){
    _formKey.currentState.save();
    if (me.type==true){
      Firestore.instance.collection('student').document(_token.id).updateData({
        'name':_name,
        'careerGoal':_careerGoal
      });
      me.student.name=_name;
      me.student.careerGoal=_careerGoal;
      loginModel.update(me);
      // version 1.5
//      me.student.name=_name;
//      me.student.careerGoal=_careerGoal;
//      UserUtil.updateStudent(me.student);
    }
    else {
      Firestore.instance.collection('teacher').document(_token.id).updateData({
        'name':_name,
        'detail':_detail,
      });
      me.teacher.name=_name;
      me.teacher.detail=_detail;
      loginModel.update(me);
      // version 1.5
//      me.teacher.name=_name;
//      me.teacher.detail=_detail;
//      UserUtil.updateTeacher(me.teacher);
    }
    widget.onToggled();
    widget.showMessage('Success!');
  }

  void _toggleCancel(){
    _formKey.currentState.reset();
    widget.onToggled();
  }

  Widget _buildStudent(BuildContext context){
    return new Container(
        margin: EdgeInsets.fromLTRB(10, 20, 10, 20),
        child:new Form(
            key: _formKey,
            child:new Column(
              children: <Widget>[
                new CircleAvatar(
                  radius: 40,
                  foregroundColor: Theme.of(context).primaryColor,
                  backgroundColor: Colors.grey,
                  backgroundImage: new NetworkImage(me.student.avatarUrl),
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Real Name", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.student.realName,
                ),
                new TextFormField(
                    decoration: new InputDecoration(
                        labelText: "Name", fillColor: Colors.white),
                    keyboardType: TextInputType.text,
                    initialValue: me.student.name,
                    onSaved: (String value) {
                      _name = value;
                    }
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Major", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.student.major,
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Grade", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.student.grade,
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Phone", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.student.phone,
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Email", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.student.email,
                ),
                _buildDropdownButton(),
                new MaterialButton(
                  color: Colors.green[500],
                  onPressed: _toggleSave,
                  child: new Text('save'),
                ),
                new MaterialButton(
                  color: Colors.red[500],
                  onPressed: _toggleCancel,
                  child: new Text('cancel'),
                ),
              ],
            )
        )
    );
  }

  Widget _buildTeacher(context){
    return new Container(
        margin: EdgeInsets.fromLTRB(10, 20, 10, 20),
        child:new Form(
            key: _formKey,
            child:new Column(
              children: <Widget>[
                new CircleAvatar(
                  radius: 40,
                  foregroundColor: Theme.of(context).primaryColor,
                  backgroundColor: Colors.grey,
                  backgroundImage: new NetworkImage(me.teacher.avatarUrl),
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Real Name", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.teacher.realName,
                ),
                new TextFormField(
                    decoration: new InputDecoration(
                        labelText: "Name", fillColor: Colors.white),
                    keyboardType: TextInputType.text,
                    initialValue: me.teacher.name,
                    onSaved: (String value) {
                      _name = value;
                    }
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Major", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.teacher.major,
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Position", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.teacher.position,
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Phone", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.teacher.phone,
                ),
                new TextFormField(
                  decoration: new InputDecoration(
                      labelText: "Email", fillColor: Colors.white),
                  keyboardType: TextInputType.text,
                  enabled: false,
                  initialValue: me.teacher.email,
                ),
                new TextFormField(
                    decoration: new InputDecoration(
                        labelText: "Description", fillColor: Colors.white),
                    keyboardType: TextInputType.text,
                    initialValue: me.teacher.detail,
                    onSaved: (String value) {
                      _detail = value;
                    }
                ),
                new MaterialButton(
                  color: Colors.green[500],
                  onPressed: _toggleSave,
                  child: new Text('save'),
                ),
                new MaterialButton(
                  color: Colors.red[500],
                  onPressed: _toggleCancel,
                  child: new Text('cancel'),
                ),
              ],
            )
        )
    );
  }

  Widget build(BuildContext context) {
    loginModel = ScopedModel.of<LoginModel>(context);
    _token = loginModel.token;
    if (_token==null){
      return new Container();
    }
    me=loginModel.model;
    if (me.type==true){
      if (_careerGoal==null) _careerGoal=me.student.careerGoal;
      return _buildStudent(context);
    }
    else {
      return _buildTeacher(context);
    }
  }
}