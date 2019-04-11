class StudentModel{
  final String id;
  final String realName;
  String name;
  final String grade;
  final String major;
  String careerGoal;
  String phone;
  String email;
  final String avatarUrl;

  StudentModel(this.id,this.realName,this.name, this.grade, this.major, this.careerGoal, this.phone, this.email, this.avatarUrl);
}

class TeacherModel{
  final String id;
  final String realName;
  String name;
  final String position;
  final String major;
  String detail;
  String phone;
  String email;
  final String avatarUrl;

  TeacherModel(this.id,this.realName,this.name, this.position, this.major, this.detail, this.phone, this.email, this.avatarUrl);
}

class UserModel{
  final bool type; //true:student,false:teacher
  final StudentModel student;
  final TeacherModel teacher;

  UserModel(this.type,this.student,this.teacher);
}

class CareerGoal{
  static const String IT="IT";
  static const String Financial="Financial";
  static const String Math="Math";
  static const String Music="Music";
}

List<StudentModel> testStudentData = [
  new StudentModel('1', 'Maggie', 'Myu', 'Bachelor Grade Three',
      'SE', CareerGoal.IT,  "18621880739","920369216@qq.com",
      "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b90e7bec54e736d10a64ec699c504fc2d562695f.jpg"),
  new StudentModel('2', 'Thomas', 'Thomas', 'Bachelor Grade Four',
      'Chemistry', CareerGoal.Financial, "18621880738", "920369217@qq.com",
      "https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/c9fcc3cec3fdfc03e20c83d9d33f8794a4c2265e.jpg")
];

List<TeacherModel> testTeacherData = [
  new TeacherModel('1', 'Teacher1', 'Teacher1', 'Professor', 'SE', 'Detail 1', '12345678901', 'teacher1@sjtu.edu.cn',
      "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/suits_cast_harvey.jpg?itok=fpTOeeBb"),
  new TeacherModel('2', 'Teacher2', 'Teacher2', 'Vice Professor', 'SE', 'Detail 2', '12345678902', 'teacher2@sjtu.edu.cn',
      "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/suits_cast_harvey.jpg?itok=fpTOeeBb")
];
