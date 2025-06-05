   // JavaScript for dropdown functionality
   document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.has-submenu');

    menuItems.forEach(item => {
      item.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const submenu = document.getElementById(targetId);

        // Toggle the open class for the clicked item
        this.classList.toggle('open');

        // Toggle the submenu
        submenu.classList.toggle('open');
      });
    });
  });

 // -------------------------------------------------------topbar js---------------------------------

   const profileBtn = document.querySelector('.profile-btn');
   const profileDropdown = document.querySelector('.profile-dropdown');
   profileBtn.addEventListener('click', (e) => {
       e.stopPropagation();
       profileDropdown.classList.toggle('active');
   });

   // Close dropdown when clicking outside
   document.addEventListener('click', (e) => {
       if (!profileDropdown.contains(e.target)) {
           profileDropdown.classList.remove('active');
       }
   });
 