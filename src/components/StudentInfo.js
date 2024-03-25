import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StudentInfo = () => {

    const [isStudentData, setIsStudentData] = useState(false)
    const [studentData, setStudentData] = useState(null)
    const [studentError, setStudentError] = useState(false)

    // custom hook implementation to increment the counter on each click on the button
    const useCounter = () => {
        const [clickCount, setClickCount] = useState(0);

        const incrementClickCount = () => {
            setClickCount(clickCount + 1);
        };

        return {
            clickCount,
            incrementClickCount
        };
    };

    const { clickCount, incrementClickCount } = useCounter();

    const fetchClassRoomAPI = async() => {
        try {
            const response = await axios.post('https://localhost:8080/https-web-service/v1/student-info', {studentId: '19981'})
        setStudentData(response?.data?.studentDetails)
        setStudentError(false)
        } catch {
            setStudentData(null)
            setStudentError(true)
        }
    }

    useEffect( () => {
        console.log("Hello from use effect")
        fetchClassRoomAPI()
    }, [isStudentData])

    const handleClick = () => {
        setIsStudentData(!isStudentData)
        incrementClickCount();
    }

    console.log("Student data", studentData, "Student Error", studentError)

    return (
        <div>Student Info
            <div><button onClick={handleClick}>Get Student Details for 19981</button></div>
            <div>
                <p>Click Count: {clickCount}</p>
            </div>
            {studentError && <p>Error: There is an error in processing the request</p>}
            {studentData && (
                <div>
                    <p>Student Name: {studentData.first_name}</p>
                    <p>Student ID: {studentData.student_id}</p>
                    <p>Course: {studentData.degree}</p>
                    <p>Trimester: {studentData.trimester}</p>
                    <p>Number of courses: {studentData.courses.length}</p>
                </div>
            )}
        </div>
    )
}
