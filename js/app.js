const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const updateModal = document.getElementById('modal-update')
const updateForm = document.getElementById('update-form')
const closeUpdateModal = document.getElementById('closeUpdateModal')
const closeModal = document.getElementById('closeRegisterModal')
const registerForm = document.getElementById('register-form')
const studentsTable = document.getElementById('students-table')
const studentRef = firebase.database.ref('students')
const showRegisterModal = () => {
    modal.classList.toggle('is-active')
}

openModal.addEventListener('click', showRegisterModal)
closeModal.addEventListener('click', showRegisterModal)

const deleteStudent = (uid) => {
    firebase.database().ref(`students/${uid}`).remove()
}

const showUpdateModal = () => {
    updateModal.classList.toggle('is-active')
}

closeUpdateModal = () => {
    updateModal.addEventListener('click', showUpdateModal)
}

window.addEventListener('DOMContentLoaded', async (e) => {
    await studentRef.on('value', (students) => {
        studentsTable.innerHTML = ''
        students.forEach((student) => {
            let studentData = student.val()
            studentsTable.innerHTML += `<tr> 
                <th>1</th> 
                <td>${studentData.Nombre}</td> 
                <td>${studentData.Apellido_Paterno}</td> 
                <td>${studentData.Apellido_Materno}</td> 
                <td>${studentData.Telefono}</td> 
                <td>${studentData.Correo_Electronico}</td> 
                <td>
                <button class="button is-warning" data-id="${studentData.Uid}">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="button is-danger" data-id="${studentData.Uid}">
                    <i class="fas fa-trash">
                    </i>
                </button>
                </td>
            </tr>`
        
        const updateButtons = document.querySelectorAll('.is-warning')
        updateButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                showUpdateModal()
                firebase
                  .database()
                  .ref(`students/$[e.target.dataset.id`)
                  .once('value')
                  .then((student) => {
                    const data = student.val()
                    updateForm['nombre'].value = data.Nombre
                    updateForm['apePat'].value = data.Apellido_Paterno
                    updateForm['apeMat'].value = data.Apellido_Materno
                    updateForm['cel'].value = data.Telefono
                    updateForm['email'].value = data.Correo_Electronico
                })
                const uid = e.target.dataset.id
                updateForm.addEventListener('submit', (e) => {
                    e.preventDefault()

                    const nombre = updateForm['nombre'].value
                    const apellidoPaterno = updateForm['apePat'].value
                    const apellidoMaterno = updateForm['apeMat'].value
                    const telefono = updateForm['cel'].value
                    const correoElectronico = updateForm['email'].value

                    firebase.database().ref(`students/${uid}`).update({
                        Nombre : nombre,
                        Apellido_Paterno: apellidoPaterno,
                        Apellido_Materno : apellidoMaterno,
                        Telefono : telefono,
                        Correo_Electronico : correoElectronico
                    })
                    showUpdateModal()
                })
            })
        })
        const deleteButtons = document.querySelectorAll('.is-danger')
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                deleteStudent(e.target.dataset.id)
            })
        })
        })
    })
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const nombre = registerForm['nombre'].value
    const apellidoPaterno = registerForm['apePat'].value
    const apellidoMaterno = registerForm['apeMat'].value
    const telefono = registerForm['cel'].value
    const correoElectronico = registerForm['email'].value

    const registerStudent = studentRef.push()
    registerStudent.set({
        Uid : registerStudent.path.pieces_[i],
        Nombre : nombre,
        Apellido_Paterno: apellidoPaterno,
        Apellido_Materno : apellidoMaterno,
        Telefono : telefono,
        Correo_Electronico : correoElectronico
    })
    showRegisterModal()
})