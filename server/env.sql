CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- 用户表
CREATE TABLE user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('manager', 'teacher') NOT NULL
);

-- 老師表（可直接用user_id）
CREATE TABLE teacher (
    teacher_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- 班级表
CREATE TABLE class (
    class_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    grade_level ENUM('F4', 'F5', 'F6') NOT NULL
);

-- 科目表
CREATE TABLE subject (
    subject_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    grade_level SET('F4', 'F5', 'F6') NOT NULL
);

-- 學生表（多對多選修科目）
CREATE TABLE student (
    student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    class_id BIGINT,
    email VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);

-- 學生-科目關係表（解選修科目限制）
CREATE TABLE student_subject (
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    PRIMARY KEY (student_id, subject_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
);

-- 房間上課時間表
CREATE TABLE room (
    room_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) UNIQUE NOT NULL
);

-- 時間表
CREATE TABLE timetable (
    timetable_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    class_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    day_of_week ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat') NOT NULL,
    period TINYINT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
);

-- 提名表
CREATE TABLE nomination (
    nomination_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    timetable_id BIGINT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (timetable_id) REFERENCES timetable(timetable_id) ON DELETE CASCADE
);

-- 換課請求表
CREATE TABLE swap_request (
    swap_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    requestor_id BIGINT NOT NULL,
    requested_teacher_id BIGINT NOT NULL,
    timetable_id BIGINT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requestor_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (requested_teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (timetable_id) REFERENCES timetable(timetable_id) ON DELETE CASCADE
);

-- 匯入時間表
CREATE TABLE import_schedule (
    import_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    import_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 活動表
CREATE TABLE event (
    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    description TEXT,
    created_by BIGINT NOT NULL,  -- 記錄誰發起的活動
    FOREIGN KEY (created_by) REFERENCES user(user_id) ON DELETE CASCADE
);

-- 近日消息表
CREATE TABLE recent_message (
    message_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,  -- 新增标题字段
    message TEXT NOT NULL,
    message_date DATETIME DEFAULT CURRENT_TIMESTAMP
);