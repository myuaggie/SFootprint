import 'package:flutter/material.dart';
import 'package:sfootprint/sfootprint_home.dart';
import 'package:sfootprint/models/login_model.dart';
import 'package:sfootprint/models/chat_model.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:sfootprint/pages/login_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.

  LoginModel loginModel = LoginModel();
  PeerModel peerModel = PeerModel();
  @override
  Widget build(BuildContext context) {
    return ScopedModel(
        model:loginModel,
        child:ScopedModel(model: peerModel, child:MaterialApp(
          title: 'SFootprint',
          theme: ThemeData(
            // This is the theme of your application.
            //
            // Try running your application with "flutter run". You'll see the
            // application has a blue toolbar. Then, without quitting the app, try
            // changing the primarySwatch below to Colors.green and then invoke
            // "hot reload" (press "r" in the console where you ran "flutter run",
            // or simply save your changes to "hot reload" in a Flutter IDE).
            // Notice that the counter didn't reset back to zero; the application
            // is not restarted.
            primarySwatch: Colors.blue,
          ),
          home: SFootprintHome(),
          routes: <String, WidgetBuilder> {
            '/home' : (BuildContext context) => new SFootprintHome(),
            '/login': (BuildContext context) => new LoginScreen(),
          },
        ))
    );
  }
}
