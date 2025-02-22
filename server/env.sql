CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

CREATE TABLE user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    teacher_id BIGINT NULL,
    admit BOOLEAN DEFAULT FALSE,
    PW_Hash VARCHAR(255) NOT NULL
);

CREATE TABLE teacher (
    teacher_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(255) NOT NULL
);

CREATE TABLE class (
    class_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL
);

CREATE TABLE student (
    student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_number BIGINT NOT NULL,
    class_id BIGINT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
    X1 elective_subject_1 VARCHAR(255),
    X2 elective_subject_2 VARCHAR(255),
    X3 elective_subject_3 VARCHAR(255)
);

CREATE TABLE subject (
    subject_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
);

CREATE TABLE room (
    room_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL
);

CREATE TABLE reward_type (
    reward_type_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reward_name VARCHAR(255) NOT NULL
);

CREATE TABLE reward (
    reward_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    issued_by_teacher_id BIGINT NOT NULL,
    reward_type_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (issued_by_teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (reward_type_id) REFERENCES reward_type(reward_type_id) ON DELETE CASCADE
);

CREATE TABLE teacher_subject (
    teacher_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    class_id BIGINT NOT NULL,
    PRIMARY KEY (teacher_id, subject_id, class_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);

CREATE TABLE timetable (
    timetable_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    day_of_week TINYINT NOT NULL,
    class_id BIGINT NOT NULL,
    course_section_id BIGINT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);

CREATE TABLE student_subject (
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    enrollment_grade DECIMAL(5,2) DEFAULT NULL,
    PRIMARY KEY (student_id, subject_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
);
