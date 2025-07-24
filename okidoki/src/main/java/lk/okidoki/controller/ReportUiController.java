package lk.okidoki.controller;

import lk.okidoki.modal.User;
import lk.okidoki.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ReportUiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired// auto generate instance
    private UserPrivilageController userPrivilageController;

    @GetMapping(value = "/report")
    public ModelAndView loadReportUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userRepository.getByUsername(auth.getName());

        ModelAndView reportUI = new ModelAndView();
        reportUI.setViewName("report.html");
        reportUI.addObject("logedusername", auth.getName());
        reportUI.addObject("loggeduserphoto", logeduser.getUser_photo());
        reportUI.addObject("pageTitle", "Report Dashboard");
        return reportUI;

    }

//    load revenue ui
    @GetMapping(value = "/revenue")
    public ModelAndView loadRevenueUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userRepository.getByUsername(auth.getName());

        ModelAndView revenueUi = new ModelAndView();
        revenueUi.setViewName("revenue.html");
        revenueUi.addObject("logedusername", auth.getName());
        revenueUi.addObject("loggeduserphoto", logeduser.getUser_photo());
        revenueUi.addObject("pageTitle", "Revenue Report");
        return revenueUi;

    }

    @GetMapping(value = "/bookingreport")
    public ModelAndView loadBookingReportUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userRepository.getByUsername(auth.getName());

        ModelAndView bookingReportUi = new ModelAndView();
        bookingReportUi.setViewName("bookingReport.html");
        bookingReportUi.addObject("logedusername", auth.getName());
        bookingReportUi.addObject("loggeduserphoto", logeduser.getUser_photo());
        bookingReportUi.addObject("pageTitle", "Booking Report");
        return bookingReportUi;

    }

    @GetMapping(value = "/revenuelicenseexpirereport")
    public ModelAndView loadRevenueLicenseExpireReportUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userRepository.getByUsername(auth.getName());

        ModelAndView revenueLicenseExpireReportUi = new ModelAndView();
        revenueLicenseExpireReportUi.setViewName("reportRevenueLicenseExpire.html");
        revenueLicenseExpireReportUi.addObject("logedusername", auth.getName());
        revenueLicenseExpireReportUi.addObject("loggeduserphoto", logeduser.getUser_photo());
        revenueLicenseExpireReportUi.addObject("pageTitle", "Revenue License Expire Report");
        return revenueLicenseExpireReportUi;

    }

    @GetMapping(value = "/insuranceexpirereport")
    public ModelAndView loadInsuranceExpireReportUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userRepository.getByUsername(auth.getName());

        ModelAndView insuranceExpireReportUi = new ModelAndView();
        insuranceExpireReportUi.setViewName("reportInsuranceExpire.html");
        insuranceExpireReportUi.addObject("logedusername", auth.getName());
        insuranceExpireReportUi.addObject("loggeduserphoto", logeduser.getUser_photo());
        insuranceExpireReportUi.addObject("pageTitle", "Insurance Expire Report");
        return insuranceExpireReportUi;

    }
}
