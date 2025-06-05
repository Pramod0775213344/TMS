package lk.okidoki.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.okidoki.modal.Role;
import lk.okidoki.modal.User;
import lk.okidoki.repository.RoleRepository;
import lk.okidoki.repository.UserRepository;


@RestController
public class LoginController {
    

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // get login ui (url -->/login)
    @RequestMapping(value = "/login")
    public ModelAndView getLoginUi() {
        ModelAndView loginUi = new ModelAndView();
        loginUi.setViewName("login.html");
        return loginUi;
    }

    // get dashboard ui (url -->/dashboard)
    @RequestMapping(value = "/dashboard")
    public ModelAndView getDashboardUi() {
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    
        ModelAndView dashboardUi = new ModelAndView();
        dashboardUi.setViewName("dashboard.html");
        dashboardUi.addObject("logedusername", auth.getName());
        return dashboardUi;
        
    }


	// Request mapping for load administration ui (url -->/administration)
	@RequestMapping(value = "/administration")
	public ModelAndView getAdministrationDashboardUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView administrationDashboardUi = new ModelAndView();
		administrationDashboardUi.setViewName("administrationdashboard.html");
        administrationDashboardUi.addObject("logedusername", auth.getName());
		return administrationDashboardUi;
	}


    // get errorpage ui(url -->/errorpage)
    @RequestMapping(value = "/errorpage")
    public ModelAndView getErrorPageUi() {

        ModelAndView errorpageUi = new ModelAndView();
        errorpageUi.setViewName("errorpage.html");
        return errorpageUi;
    }

    // admin creation
    @RequestMapping(value = "/createadmin")
    public ModelAndView generateAdminAccount() {

        User extAdminUser = userRepository.getByUsername("Admin");
        if (extAdminUser == null) {
            User adminUser = new User();
            adminUser.setUsername("Admin");
            adminUser.setEmail("admin@okidoki.com");
            adminUser.setStatus(true);
            adminUser.setAdded_datetime(LocalDateTime.now());
            adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));

            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.getReferenceById(1);
            roles.add(adminRole);
            adminUser.setRoles(roles);

            userRepository.save(adminUser);

        }
        ModelAndView loginUi = new ModelAndView();
        loginUi.setViewName("login.html");
        return loginUi;
    }

}
