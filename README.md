This is a web application that provides course coordinators and some professors with convenient administration and planning for degree and course purposes.
This project is only for the use of internal professors and development and maintenance personnel of the school.
Users can add, delete, and edit content and relationships for available degrees and related programs.
Learning plans can be made for easy sharing or future reference.

The development framework used in this degree course management system:
Front-end: VUE+ElementUI, front-end and back-end data exchange based on JSON format
Back-end: Java, core framework:spring boot, Data persistence layer framework JPA.

The data on the university of Adelaide official website are true and valid.
Data source is from https://calendar.adelaide.edu.au/

This development Project is for Professor Claudia's(Associate Professor, School of Computer and Mathematical Sciences, The University of Adelaide

) use only.

My system environment is Linux-Centos7.6（64bit）---VirtualBox Self-built Linux system，
I have been working as a DBA in China. I am familiar with Linux and databases.
The Operating system environment is installed and configured according to your own preferences.

Operating system:	Linux-Centos7.6（64bit）
Server host name:	kill-mysql-2
IP: 192.168.56.3 
Language environment:	English
Software environment preparation：
nvm（nodejs version management tool）
cmake-2.8.12.2.tar
boost_1_59_0.tar
mysql-5.7.43.tar.gz (source code)
[root@kill-mysql-2 ~]# nvm --version
0.39.5
[root@kill-mysql-2 ~]# npm --version
7.15.1
[root@kill-mysql-2 ~]# node --version
v16.3.0

[root@kill-mysql-2 ~]# gcc --version
gcc (GCC) 11.2.0
Copyright (C) 2021 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

[root@kill-mysql-2 ~]# java -version
openjdk version "1.8.0_392"
OpenJDK Runtime Environment (build 1.8.0_392-b08)
OpenJDK 64-Bit Server VM (build 25.392-b08, mixed mode)

Database: Mysql (Installation Sucessfully without any error!!!)
[mysql@kill-mysql-2 ~]$ mysql --version
mysql  Ver 14.14 Distrib 5.7.43, for Linux (x86_64) using  EditLine wrapper
Port:5743
Grant your own mysql user,password and privileges.

load data to mysql: 
[mysql@kill-mysql-2 ~]$ superDBA < /home/mysql/course_system_20240302.sql  (Must succeed without any error!!!)
(Note: superDBA means I have build soft link to mysql profile. You need to choose your shell to load data.) 

Attention please: The above environment must be successfully installed and configured without any error.Otherwise this program won't start properly.
-----------------------------------------------------------------------------------------------------------------------------------------------------
How to run program !!!! 
Please Follow this instructions.
1.----Code test program run startup:
1.Front-end web startup:
[root@kill-mysql-2 ~]# unzip course-web-version-01.zip
[root@kill-mysql-2 ~]# cd course-web-version-01
[root@kill-mysql-2 ~]# more course-web/config/index.js (Note:Modify the configuration environment based on your system configuration environment)
[root@kill-mysql-2 ~]# nohup npm run dev &

2.Backend JAVA startup:
--1. Windows install jdk-1.8
--2. Windows install IDEA Sucessfully (Important!!!)
Windows Decompressing back-end-spring-boot-demo-version-01.zip
Use IDEA to Open spring-boot-demo
find a file application-dev.properties (Note:Modify the configuration environment based on your system configuration environment)
#db
spring.datasource.url=jdbc:mysql://192.168.56.3:5743/course_system?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=*******
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

Click the triangle symbol RUN in the upper right corner.
Observe terminal logs until the JVM running indicates normal startup.

Accessed via web browser:http://192.168.56.3:7787 
Access normal and display data via web browser. The program starts sucessfully.

login:zxy
password:111111
Or
login:Claudia
password:111111

----------------------------------------------------------------------------------------------------------------------------

2.---If the project goes online to the production server.
Linux-CentOS 7.6 
Please use nginx to deploy the web front-end project. ---Just my suggestion---
1.LINUX Install nginx and deploy the web front-end project  (Sucessfully!!!)
2.LINUX Backend JAVA startup:
eg:
[root@kill-mysql-2 ~]# nohup java -jar spring-boot-demo.jar >> ./log/`date +%Y-%m-%d`.out 2>&1 &

Accessed via web browser:http://192.168.56.3:7787 
Access normal and display data via web browser. The program starts sucessfully.

3.---
You can deploy this project on Docker startup or Google-Kubernetes（K8s）startup.
This is now enterprise-class rapid deployment and scaling and high availability and fault tolerance.
I will deploy this project on Docker startup or Google-Kubernetes（K8s）startup.
However, I won't go into details here. It is so long. It depends on your learning ability and interest.

Thanks for every one.








