import 'package:sfootprint/models/settings_model.dart';


class UserUtil{

  static StudentModel getStudentBy(String id){
    return testStudentData[int.parse(id)];
  }

  static TeacherModel getTeacherBy(String id){
    return testTeacherData[int.parse(id)];
  }

  static UserModel getUserBy(String id, int type){
    if (type==0){
      return UserModel(true,testStudentData[int.parse(id)],null);
    }
    else return UserModel(false,null,testTeacherData[int.parse(id)]);
  }

  static List<StudentModel> getStudentList(){
    return testStudentData;
  }

  static List<TeacherModel> getTeacherList(){
    return testTeacherData;
  }

  static List<UserModel> getUserList(int type){
    List<UserModel> l=new List<UserModel>();
    if (type==0){
      for (StudentModel s in testStudentData){
        l.add(UserModel(true, s, null));
      }
    }
    else {
      for (TeacherModel t in testTeacherData){
        l.add(UserModel(false, null, t));
      }
    }
    return l;
  }

  static void updateStudent(StudentModel s){
    for (int i=0;i<testStudentData.length;i++){
      if (testStudentData[i].id==s.id){
        testStudentData[i]=s;
        return;
      }
    }
  }

  static void updateTeacher(TeacherModel t){
    for (int i=0;i<testTeacherData.length;i++){
      if (testTeacherData[i].id==t.id){
        testTeacherData[i]=t;
        return;
      }
    }
  }
}