function addCourse() {
    const courseContainer = document.getElementById('courses');
    const newRow = document.createElement('tr');
    newRow.classList.add('course');

    newRow.innerHTML = `
        <td><input type="text" class="courseName" name="courseName" placeholder="Tên Môn Học" required></td>
        <td><input type="number" class="credits" name="credits" step="0.5" min="0" required placeholder="Số Tín Chỉ"></td>
        <td><input type="number" class="attendance" name="attendance" step="0.01" min="0" max="10" required placeholder="Điểm Chuyên Cần"></td>
        <td><input type="number" class="midterm" name="midterm" step="0.01" min="0" max="10" required placeholder="Điểm Giữa Kì"></td>
        <td><input type="number" class="final" name="final" step="0.01" min="0" max="10" required placeholder="Điểm Cuối Kì"></td>
        <td><button type="button" onclick="removeCourse(this)">Xóa</button></td>
    `;

    courseContainer.appendChild(newRow);
}

function removeCourse(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function validateInput(input) {
    const value = parseFloat(input.value);
    if (value < 0 || value > 10) {
        alert("Lỗi: Điểm phải nằm trong khoảng từ 0 đến 10. Vui lòng nhập lại.");
        input.focus();
        return false;
    }
    return true;
}

function calculateGPA() {
    const courses = document.querySelectorAll('.course');
    let totalScore10 = 0;
    let totalScore4 = 0;
    let totalCredits = 0;
    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = ''; // Clear previous results

    for (let course of courses) {
        const attendance = course.querySelector('.attendance');
        const midterm = course.querySelector('.midterm');
        const final = course.querySelector('.final');

        if (!validateInput(attendance) || !validateInput(midterm) || !validateInput(final)) {
            return; // Dừng tính toán nếu có lỗi nhập điểm
        }

        const courseName = course.querySelector('.courseName').value || "Chưa đặt tên";
        const credits = parseFloat(course.querySelector('.credits').value);

        const score10 = (parseFloat(attendance.value) * 0.2) + (parseFloat(midterm.value) * 0.2) + (parseFloat(final.value) * 0.6);
        let score4, gradeLetter;

        if (score10 >= 8.95) {
            score4 = 4.0;
            gradeLetter = "A+";
        } else if (score10 >= 8.45) {
            score4 = 3.7;
            gradeLetter = "A";
        } else if (score10 >= 7.95) {
            score4 = 3.5;
            gradeLetter = "B+";
        } else if (score10 >= 6.95) {
            score4 = 3.0;
            gradeLetter = "B";
        } else if (score10 >= 6.45) {
            score4 = 2.5;
            gradeLetter = "C+";
        } else if (score10 >= 5.45) {
            score4 = 2.0;
            gradeLetter = "C";
        } else if (score10 >= 4.95) {
            score4 = 1.5;
            gradeLetter = "D+";
        } else if (score10 >= 3.95) {
            score4 = 1.0;
            gradeLetter = "D";
        } else {
            score4 = 0.0;
            gradeLetter = "F";
        }

        totalScore10 += score10 * credits;
        totalScore4 += score4 * credits;
        totalCredits += credits;

        // Add row to the result table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${courseName}</td>
            <td>${score10.toFixed(2)}</td>
            <td>${score4.toFixed(2)}</td>
            <td>${gradeLetter}</td>
        `;
        resultTable.appendChild(row);
    }

    const averageScore10 = totalScore10 / totalCredits;
    const averageScore4 = totalScore4 / totalCredits;

    document.getElementById('totalScore10').textContent = averageScore10.toFixed(2);
    document.getElementById('totalScore4').textContent = averageScore4.toFixed(3);

    displayChatBox(averageScore4);
}

function displayChatBox(gpa) {
    const chatBox = document.getElementById('chatBox');
    const chatMessage = document.getElementById('chatMessage');
    let message = '';

    if (gpa < 2.5) {
        message = `Số điểm cần để đạt Khá là ${(2.5 - gpa).toFixed(2)}. Hãy cố gắng hơn!`;
    } else if (gpa < 3.2) {
        message = `Số điểm cần để đạt Giỏi là ${(3.2 - gpa).toFixed(2)}. Bạn đang tiến bộ rất tốt!`;
    } else if (gpa < 3.6) {
        message = `Số điểm cần để đạt Xuất Sắc là ${(3.6 - gpa).toFixed(2)}. Bạn đã gần đạt mức cao nhất!`;
    } else {
        const messages = [
            "Chúc mừng bạn! Bạn đã đạt mức Xuất Sắc!",
            "Thành tích tuyệt vời! Tiếp tục duy trì!",
            "Xuất sắc! Bạn đang trên đỉnh cao của học tập!"
        ];
        message = messages[Math.floor(Math.random() * messages.length)];
    }

    chatMessage.textContent = message;
    chatBox.classList.remove('hidden');
}

function closeChatBox() {
    document.getElementById('chatBox').classList.add('hidden');
}
