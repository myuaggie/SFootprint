#!/usr/bin/env python
# coding: utf-8

# In[1]:


import math
import csv


# In[2]:


class CoursesOfSemester():
    courses=[]    # list of course_id 
    def __init__(self):
        self.courses=[]
    def add_course(self,course_id):
        self.courses.append(course_id)


# In[3]:


class Student():
    student_id=''
    all_courses=[]  # list of CoursesOfSemester 
    all_courses_mapped=[]
    def __init__(self, student_id):
        self.student_id=student_id
        self.all_courses=[] 
        self.all_courses_mapped=[]
    def add_courses_of_semester(self, coursesOfSemester):
        self.all_courses.append(coursesOfSemester)
    def set_all_courses_mapped(self,allCoursesMapped):
        self.all_courses_mapped=allCoursesMapped
    def __str__(self):
        mystr='student_id:'+self.student_id+'\n'
        mystr+='semesters:'+str(len(self.all_courses))+'['
        for courses in self.all_courses:
            mystr+=str(len(courses.courses))+','
        mystr+=']'
        return mystr


# In[4]:


class Course():
    student_id=''
    course_id=''
    semester=0  # 1-8
    def __init__(self, student_id, course_id,semester):
        self.student_id=student_id
        self.course_id=course_id
        self.semester=semester


# In[5]:


class AprioriAll():
    data=[]  # train_data
    min_support_rate=0
    students=[] # list of students
    min_support=0
    litemset=[] # list of set of courseId
    trans_map={} # map of seq num -> set of courseId
    sequence_pattern_list=[]
    def __init__(self, min_support_rate=0.4, train_data='test_courses1.csv'):
        csv_file = csv.reader(open(train_data,'r'))
        for line in csv_file:
            self.data.append(Course(line[0],line[1],line[2]))
        self.min_support_rate=min_support_rate
    
    def sortPhase(self):
        tmp_student_id=''
        tmp_semester=0
        cur_student=None
        cur_courses_of_semester=CoursesOfSemester()
        for course in self.data:
            if course.semester!=tmp_semester:
                # print('semester:'+str(course.semester))
                if cur_student is not None and len(cur_courses_of_semester.courses)>0:
                    cur_student.add_courses_of_semester(cur_courses_of_semester)
                cur_courses_of_semester=CoursesOfSemester()
                tmp_semester=course.semester
            if course.student_id!=tmp_student_id:
                # print('student:'+course.student_id)
                tmp_student_id=course.student_id
                if cur_student is not None:
                    self.students.append(cur_student)
                cur_student=Student(tmp_student_id)
                # tmp_semester=0
            cur_courses_of_semester.add_course(course.course_id)
            # print('len of  cur_courses_of_semester:'+str(len(cur_courses_of_semester.courses)))
        if len(cur_courses_of_semester.courses)>0:
            cur_courses_of_semester.courses.sort()
            cur_student.add_courses_of_semester(cur_courses_of_semester)
        if cur_student is not None:
            self.students.append(cur_student)
        self.min_support=math.ceil(self.min_support_rate*len(self.students))
        
    def litemsetPhase(self):
        courses=[]  # list of set of courseId
        for student in self.students:
            for courses_of_semester in student.all_courses:
                for course in  courses_of_semester.courses:
                    if set([course]) not in courses:
                        courses.append(set([course]))
        # courses.sort()
        candidates=courses
        while True:
            temp_valid=[]  # list of set of courseId
            temp_invalid=[]  # list of set of courseId
            for course in candidates:
                count = 0
                for student in self.students:
                    for courses_of_semester in student.all_courses:
                        if course.issubset(courses_of_semester.courses):
                            count+=1
                            break
                if count>=self.min_support:
                    temp_valid.append(course)
                    self.litemset.append(course)
                else:
                    temp_invalid.append(course)
            print('%d-itemset len:%d'%(len(course), len(temp_valid)))
            candidates = self._getNextCandidate(temp_valid,temp_invalid,len(course))
            if len(candidates)==0:
                break
    
    def _getNextCandidate(self, courses_set, invalid_courses_set_list,old_len):
        prev_len=len(courses_set)
        result=[] # list of set of courseId
        for i in range(prev_len):
            for j in range(1, prev_len):
                snew=courses_set[i]|courses_set[j]
                if len(snew)==(old_len+1) and self._noPrune(snew, invalid_courses_set_list):
                    if snew not in result:
                        result.append(snew)
        print('%d-itemset candidate len:%d'%(old_len+1, len(result)))
        return result
    
    def _noPrune(self,courses_set, invalid_list):
        for invalid_set in invalid_list:
            if invalid_set.issubset(courses_set):
                return False
        return True
    
    def transformationPhase(self):
        val=1
        for courses_set in self.litemset:
            self.trans_map[val]=courses_set
            val+=1
        for student in self.students:
            for courses_of_semester in student.all_courses:
                tmp=set()
                for k in self.trans_map.keys():
                    if self.trans_map[k].issubset(courses_of_semester.courses):
                        tmp.add(k)
                if len(tmp)!=0:
                    student.all_courses_mapped.append(tmp)

    def sequencePhase(self):
        candidates=[]
        for k in self.trans_map.keys():
            candidates.append(set([k]))
        while True:
            temp_valid=[]  # list of set of courseId
            temp_invalid=[]  # list of set of courseId
            for courses in candidates:
                count = 0
                for student in self.students:
                    if self._matchSequence(courses,student.all_courses_mapped):
                        count+=1
                if count>=self.min_support:
                    temp_valid.append(courses)
                    self.maximalPhase(courses)
                    self.sequence_pattern_list.append(courses)
                else:
                    temp_invalid.append(courses)
            print('%d-itemset valid len:%d'%(len(courses), len(temp_valid)))
            print('%d-itemset invalid len:%d'%(len(courses), len(temp_invalid)))
            candidates = self._getNextCandidate(temp_valid,temp_invalid,len(courses))
            if len(candidates)==0:
                break
                    
    def maximalPhase(self, sequence):
        to_remove=[]
        for sequence_pattern in reversed(self.sequence_pattern_list):
            if sequence_pattern.issubset(sequence):
                to_remove.append(sequence_pattern)
        # print('to_remove len:%d'%(len(to_remove)))
        for o in to_remove:
            self.sequence_pattern_list.remove(o)
        
    def _matchSequence(self, sequence, all_courses_mapped):
        idx=0
        sequence_list=list(sequence)
        for courses_mapped in all_courses_mapped:
            for course_mapped in courses_mapped:
                if sequence_list[idx]==course_mapped:
                    idx+=1
                    if idx >= len(sequence):
                        return True
        return False
    
    def getResult(self):
        result=[]
        for sequence_pattern in self.sequence_pattern_list:
            tmp=[]
            for seq_num in sequence_pattern:
                # print(list(self.trans_map[seq_num]))
                tmp.extend(list(self.trans_map[seq_num]))
            result.append(tmp)
        return result
    
    def recommend(self, all_courses):
        # input: list of set of course id
        result = self.getResult()
        rec_dict={}
        for sequence_pattern in result:
            union=set(sequence_pattern)&set(all_courses)
            if len(union) not in rec_dict.keys():
                rec_dict[len(union)]=[]
            tmp=[]
            for course in sequence_pattern:
                if course not in all_courses:
                    tmp.append(course)
            rec_tmp=rec_dict[len(union)]
            rec_new=[]
            for rec in rec_tmp:
                if not set(rec).issubset(tmp):
                    rec_new.append(rec)
            rec_new.append(tmp)
            rec_dict[len(union)]=rec_new
        rec_list=rec_dict[max(rec_dict.keys())]
        return rec_list


# In[6]:


aa=AprioriAll(train_data='test_courses2.csv',min_support_rate=0.6)
aa.sortPhase()
aa.litemsetPhase()
aa.transformationPhase()
aa.sequencePhase()


# In[7]:


print(aa.getResult())
for s in aa.students:
    print(s)
len(aa.litemset)
for s in aa.students:
    print(s.all_courses_mapped)
print(aa.sequence_pattern_list)


# In[8]:


dataToPredict=[
    'CS902','MA119','SE117','SE222'
]


# In[9]:


print(aa.recommend(dataToPredict))


# In[10]:


dataToPredict2=[
    'PH001','EI235','MA081'
]
print(aa.recommend(dataToPredict2))

