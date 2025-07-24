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

       loadModuleWithoutUser();
       breadCrumbItemInTopBar();


        moduleListForUser = getServiceRequest("/moduleforuser");
       dataFillIntoDataList(selectModuleList, moduleListForUser, "name");
  });

 // --------------------------------------------------------------------------------------------------------------
 // when select the module from the list ,auto navigate to the module page
   const selectModule = document.getElementById('typeModule');
    selectModule.addEventListener('focusout', function () {
         // Get the module list for the user
         const selectedModule = this.value;
        console.log("Selected module:", selectedModule);
            // Check if the selected module is in the list
            const isModuleInList = moduleListForUser.find(module => module.name === selectedModule);
            // If the selected module is in the list, navigate to its page
         if (isModuleInList) {
              // selectmodule eke id eke lowwercase walata convert karala link eke yawanawa
              // select karana module eke space thiyenw nam ewath ayin karanawa
              window.location.href = `/${selectedModule.toLowerCase().replace(/\s+/g, '')}`;

         } else{
             console.log("Please select a module from the list.");
         }
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


 //   -------------------------------------------------------element hide karanwa user anuwa---------------------------------

   const loadModuleWithoutUser = () => {
        moduleList = getServiceRequest("/modulewithoutuser")
       for (const module  of moduleList) {
           $(`#${module.name}`).css("display", "none");
           $(`.${module.name}`).css("display", "none");

       }
   }

   // ------------------------------------------------------dynamically breadcrumb item in top bar-----------------------------
    const breadCrumbItemInTopBar = () => {
         // cuurunt location path eka gnnw  / meken split karala first segment eka gnnw
         const currentPath ='/' + window.location.pathname.split('/')[1]; // Get the first segment of the path

        //class path enter as breadcum
        if (currentPath === '/dashboard') {
            document.querySelector('#dashobordPath').innerHTML = `<a style="text-decoration: none; color: #0CAF60" href="${currentPath}">Dashboard</a>`;
        }else{
            curruntPath.style.display = 'block';
            document.querySelector('#dashobordPath').innerHTML = `<a class="opacity-5 text-dark" style="text-decoration: none;" href="/dashboard">Dashboard</a>`;
            document.querySelector('#curruntPath').innerHTML = `<a style="text-decoration: none; color: #0CAF60" href="${currentPath}">${currentPath.split('/')[1].charAt(0).toUpperCase() + currentPath.split('/')[1].slice(1)}</a>`;
        }

    };

   // -----------------------------------------------------active side bar item highlight----------------------------------------

   const colorActiveSideBarMenuItem = () => {
       const currentPath = window.location.pathname;
       const menuItems = document.querySelectorAll('.menu-item');


       const subMenuItems = document.querySelectorAll('.submenu-item');

       // Highlight main menu items
       menuItems.forEach(menuItem => {
           const itemPath = menuItem.querySelector('.menu-item a')?.getAttribute('href');
           if (itemPath && itemPath === currentPath) {
               menuItem.classList.add('active', 'open');
           } else {
               menuItem.classList.remove('active', 'open');
           }
       });

       // Highlight submenu items
       subMenuItems.forEach(item => {
           const itemPath = item.getAttribute('href');
           if (itemPath === currentPath) {
               item.classList.add('active');
               item.style.cssText += 'background-color: #e0f7fa; color: #00796b;';

               // Open parent menu if submenu is active
               const parentMenu = item.closest('.submenu');
               if (parentMenu) {
                   parentMenu.classList.add('open');
                   const parentMenuItem = document.querySelector(`[data-target="${parentMenu.id}"]`);
                   if (parentMenuItem) {
                       parentMenuItem.classList.add('open');
                   }
               }
           } else {
               item.classList.remove('active');
           }
       });
   }