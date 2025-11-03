// // **!!! เปลี่ยน URL เหล่านี้เป็น Production Webhook URL ของ n8n ของคุณ !!!**
// // POST: สำหรับเพิ่มงานใหม่ และแก้ไขสถานะงาน
// const POST_WEBHOOK_URL = "https://n8n01.skc.co.th/webhook/form-input"; 
// // GET: สำหรับดึงรายการงานค้างมาแสดงผล
// const GET_WEBHOOK_URL = "https://n8n01.skc.co.th/webhook/get-tasks"; 

// const messageDiv = document.getElementById('message');
// document.getElementById('task-form').addEventListener('submit', submitNewTask);
// const taskListDiv = document.getElementById('task-list');

// // ฟังก์ชันหลักที่ทำงานเมื่อหน้าเว็บโหลด
// window.onload = loadPendingTasks;


// // --- [1] ฟังก์ชัน: เพิ่มงานใหม่ (POST: action=new_task) ---
// async function submitNewTask(event) {
//     event.preventDefault();

//     const dataToSend = {
//         action: "new_task", 
//         data: {
//             "Task Name": document.getElementById('task-name').value,
//             "Due Date": document.getElementById('due-date').value,
//             "Status": document.getElementById('status').value
//         }
//     };
    
//     // ส่งข้อมูลไปยัง Webhook POST
//     try {
//         // [โค้ด fetch สำหรับ POST Request เหมือนเดิม]

//         const response = await fetch(POST_WEBHOOK_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(dataToSend)
//         });

//         const responseJson = await response.json(); 

//         if (response.ok && responseJson.success) {
//             messageDiv.textContent = '✅ บันทึกงานใหม่สำเร็จ!';
//             messageDiv.className = 'success';
//             messageDiv.style.display = 'block';
//             document.getElementById('task-form').reset(); 
//             loadPendingTasks(); // โหลดรายการงานใหม่หลังเพิ่มสำเร็จ
//         } else {
//             messageDiv.textContent = `❌ เกิดข้อผิดพลาด: ${responseJson.message || 'ไม่สามารถบันทึกข้อมูลได้'}`;
//             messageDiv.className = 'error';
//             messageDiv.style.display = 'block';
//         }
//     } catch (error) {
//         console.error('Network Error:', error);
//         messageDiv.textContent = '❌ ไม่สามารถเชื่อมต่อกับระบบได้';
//         messageDiv.className = 'error';
//         messageDiv.style.display = 'block';
//     }
// }


// // --- [2] ฟังก์ชัน: ดึงรายการงานค้าง (GET) ---
// async function loadPendingTasks() {
//     taskListDiv.innerHTML = '<p style="text-align:center;">กำลังโหลดรายการงานค้างล่าสุด...</p>';

//     try {
//         // ส่ง GET Request ไปยัง n8n เพื่อดึงรายการงาน
//         const response = await fetch(GET_WEBHOOK_URL, { method: 'GET' });
//         const tasks = await response.json(); // tasks คือ Array ของรายการงาน
        
//         taskListDiv.innerHTML = '';
        
//         if (!Array.isArray(tasks) || tasks.length === 0) {
//             taskListDiv.innerHTML = '<p style="text-align:center; color:#e74c3c;">🎉 ไม่มีงานค้างในระบบ!</p>';
//             return;
//         }

//         tasks.forEach(task => {
//             const item = document.createElement('div');
//             item.className = 'task-item';
            
//             // task.row_id ถูกเพิ่มเข้ามาโดยโหนด SET ใน n8n
//             item.innerHTML = `
//                 <div class="task-info">
//                     <strong>${task["Task Name"]}</strong><br>
//                     <p>กำหนดส่ง: ${task["Due Date"]} | สถานะ: ${task["Status"]}</p>
//                 </div>
//                 <button class="btn done" onclick="markTaskAsDone('${task.row_id}')">ทำเสร็จแล้ว</button>
//             `;
//             taskListDiv.appendChild(item);
//         });

//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         taskListDiv.innerHTML = '<p style="text-align:center; color:red;">❌ ไม่สามารถโหลดรายการงานได้ (โปรดตรวจสอบ GET Webhook)</p>';
//     }
// }


// // --- [3] ฟังก์ชัน: แก้ไขสถานะงาน (POST: action=update_status) ---
// async function markTaskAsDone(rowId) {
//     if (!confirm('ยืนยันว่างานนี้เสร็จสมบูรณ์แล้วใช่หรือไม่?')) {
//         return;
//     }

//     const dataToSend = {
//         action: "update_status", 
//         row_id: rowId, // Row ID ที่ได้จากการดึงข้อมูล
//         new_status: "Done"
//     };

//     try {
//         // ส่งข้อมูลไปยัง Webhook POST (ตัวเดียวกับที่ใช้เพิ่มงาน)
//         const response = await fetch(POST_WEBHOOK_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(dataToSend)
//         });

//         const responseJson = await response.json();

//         if (response.ok && responseJson.success) {
//             alert('สถานะอัปเดตเรียบร้อย!');
//             loadPendingTasks(); // โหลดรายการงานใหม่
//         } else {
//             alert(`❌ อัปเดตล้มเหลว: ${responseJson.message || 'เกิดข้อผิดพลาดในการอัปเดต'}`);
//         }

//     } catch (error) {
//         console.error('Error updating status:', error);
//         alert('❌ ไม่สามารถเชื่อมต่อเพื่ออัปเดตสถานะได้');
//     }
// }