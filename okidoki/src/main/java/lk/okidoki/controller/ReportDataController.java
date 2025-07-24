package lk.okidoki.controller;

import lk.okidoki.modal.Booking;
import lk.okidoki.modal.Privilage;
import lk.okidoki.modal.User;
import lk.okidoki.modal.Vehicle;
import lk.okidoki.repository.ReportRepository;
import lk.okidoki.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ReportDataController {

    @Autowired
    private UserRepository userRepository;

    @Autowired// auto generate instance
    private UserPrivilageController userPrivilageController;

    @Autowired
    private ReportRepository reportRepository;


    // Get mapping for get vehicle conut  by vehicle type  (url -->/report/countbyvehicletype)
    @GetMapping(value = "/report/countbyvehicletype")
    public String[][] getCountByVehicleType() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
            return reportRepository.getCountByVehicleType();
    }

    // Get mapping for get current month booking count  by booking status (url -->/report/countbybookingstatus)
    @GetMapping(value = "/report/countbybookingstatus")
    public String[][] getCountByBookingStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getCountByBookingStatus();
    }

    // Get mapping for get current month booking count  by customer  (url -->/report/bookingcountbycustomer)
    @GetMapping(value = "/report/bookingcountbycustomer")
    public String[][] getBookingCountByCustomer() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getBookingCountByCustomer();
    }

    // Get mapping for get booking distance monthly wise  (url -->/report/totalbookingdistancebymonthlybookings)
    @GetMapping(value = "/report/totalbookingdistancebymonthlybookings")
    public String[][] getBookingDistanceByMonthlyBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.gettotalDistanceByMonthlyBookings();
    }

    // Get mapping for get booking distance monthly wise  (url -->/report/vehiclerevenuecurrentmonth)
    @GetMapping(value = "/report/vehiclerevenuecurrentmonth")
    public String[][] getCurrentMonthVehicleRevenue(@RequestParam ("customerid") Integer customerid, @RequestParam( "vehicletypeid") Integer vehicletypeid) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getCurrentMonthVehicleRevenue(customerid,vehicletypeid);
    }

    // Get mapping for get bookings by date range (url -->/reportbooking/bydaterangeandtype?startdate=1&endtdate=2)
    @GetMapping(value = "/reportbooking/bydaterangeandtype",params = {"startdate","endtdate"}, produces = "application/json")
    public List<Booking> getBookingReport(@RequestParam("startdate") Date startdate, @RequestParam("endtdate") Date endtdate) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage  userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
            return reportRepository.getBookingByDateRange(startdate,endtdate);

    }

    // (url -->/report/revenuelicenseexpirevehicle)
    @GetMapping(value = "/report/revenuelicenseexpirevehicle")
    public List<Vehicle> getRevenueLicenseExpireList() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getRevenueLicenseExpireList();
    }

    // (url -->/report/revenuelicenseexpirevehicle)
    @GetMapping(value = "/report/insuranceexpirevehicle")
    public List<Vehicle> getInsuranceExpireList() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getInsuranceExpireList();
    }

    // (url -->/report/countofactivevehicles)
    @GetMapping(value = "/report/countofactivevehicles")
    public Integer getCountOfActiveVehicles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getCountOfActiveVehicles();
    }
    // (url -->/report/countofallvehicles)
    @GetMapping(value = "/report/countofallvehicles")
    public Integer getCountOfAllVehicles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getCountOfAllVehicles();
    }

    // (url -->/report/countofrevenuelicenseexpirevehicles)
    @GetMapping(value = "/report/countofrevenuelicenseexpirevehicles")
    public Integer getCountOfRevenueLicenseExpireVehicles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getCountOfRevenueLicenseExpireVehicles();
    }

    // (url -->/report/countofinsuranceexpirevehicles)
    @GetMapping(value = "/report/countofinsuranceexpirevehicles")
    public Integer getCountOfInsuranceExpireVehicles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getCountOfInsuranceExpireVehicles();
    }
    // (url -->/report/recentlyupdatedrevenuelicenseexpirevehicles)
    @GetMapping(value = "/report/recentlyupdatedrevenuelicenseexpirevehicles")
    public List<Vehicle> getRecentlyUpdatedRevenueLicenseExpireVehicles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getRecentlyUpdatedRevenueLicenseExpireVehicles();
    }
    // (url -->/report/recentlyupdatedinsuranceexpirevehicles)
    @GetMapping(value = "/report/recentlyupdatedinsuranceexpirevehicles")
    public List<Vehicle> getRecentlyUpdatedInsuranceExpireVehicles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getRecentlyUpdatedInsuranceExpireVehicles();
    }

    // Get mapping for get vehicles revenue by customer id and vehicle type id and group by current month and year
//    URL ( "/report/vehicleRevenueByVehicleType?customerId=1&vehicleTypeId=1")
    @GetMapping(value = "/report/vehicleRevenueByVehicleType",params = {"customerId","vehicleTypeId"}, produces = "application/json")
    public List<Object[]> getVehiclesRevenueByCustomerIdAndVehicleTypeAndGroupByCurrantMonthAndYear(@RequestParam("customerId") Integer customerId, @RequestParam("vehicleTypeId") Integer vehicleTypeId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Report");
        return reportRepository.getVehiclesRevenueByCustomerIdAndVehicleTypeAndGroupByCurrantMonthAndYear(customerId, vehicleTypeId);
    }
}
