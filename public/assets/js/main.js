document.addEventListener("DOMContentLoaded", function(event) {
  const icon = document.getElementById('favicon');
  const name = document.getElementById('title');
  var selectedValue = localStorage.getItem("selectedOption");
  if (selectedValue) {
      switch (selectedValue) {
          case 'Google':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/google.png');
              name.textContent = 'Google';
              localStorage.setItem("name", "Google");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/google.png");
          case 'Drive':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/drive.png');
              name.textContent = 'My Drive - Google Drive';
              localStorage.setItem("name", "My Drive - Google Drive");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/drive.png");
          case 'Classroom':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/classroom.png');
              name.textContent = 'Classes';
              localStorage.setItem("name", "Classes");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/classroom.png");
          case 'Schoology':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/schoology.png');
              name.textContent = 'Home | Schoology';
              localStorage.setItem("name", "Home | Schoology");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/schoology.png");
          case 'Gmail':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/gmail.png');
              name.textContent = 'Gmail';
              localStorage.setItem("name", "Gmail");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/gmail.png");
          case 'Clever':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/clever.png');
              name.textContent = 'Clever | Portal';
              localStorage.setItem("name", "Clever | Portal");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/clever.png");
          case 'Khan':
              icon.setAttribute('href', 'https://raw.githack.com/Aluben-service/Aluben_icons/main/khan.png');
              name.textContent = 'Dashboard | Khan Academy';
              localStorage.setItem("name", "Dashboard | Khan Academy");
              localStorage.setItem("icon", "https://raw.githack.com/Aluben-service/Aluben_icons/main/khan.png");
              break;
          default:
              break;
      }
  }
