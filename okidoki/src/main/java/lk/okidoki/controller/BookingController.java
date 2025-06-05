package lk.okidoki.controller;

import lk.okidoki.modal.Booking;
import lk.okidoki.modal.Package;
import lk.okidoki.modal.Privilage;
import lk.okidoki.modal.User;
import lk.okidoki.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@RestController
// servalet container implement karapu service update karaganna thamai
// @RestCntroller anotation eka use karanne
public class BookingController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingStatusRepository bookingStatusRepository;

    @Autowired
    private UserPrivilageController userPrivilageController;

    @Autowired
    private CustomerAgreementRepository customerAgreementRepository;

   
    // @Autowired
    // private LocationRepository locationRepository;

    // get mapping for get booking ui(url --->/booking)
    @GetMapping(value = "/booking")
    public ModelAndView loadBookingUi() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView bookinUI = new ModelAndView();
        bookinUI.setViewName("booking.html");
        bookinUI.addObject("logedusername", auth.getName());
        return bookinUI;

    }

    // get mapping for get all booking data (url -->/booking/alldata)
    @RequestMapping(value = "/booking/alldata")
    public List<Booking> getAllBookingData() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Booking");

        if (userPrivilage.getPrivi_select()) {
            return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        }else {
            return new ArrayList<>();
        }

    }

    // get mapping for booking insert into table(url -->/booking/insert)
    @PostMapping(value = "/booking/insert")
    public String saveBooking(@RequestBody Booking booking) {
        // checek authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Booking");
        User logeduser = userRepository.getByUsername(auth.getName());

        // check existing
        if (userPrivilage.getPrivi_insert()) {
            try {

                // auto updated date and time
                booking.setAdded_datetime(LocalDateTime.now());
                booking.setAdded_user_id(logeduser.getId());
                booking.setBooking_no("CFC2500014");


//                booking eka daddi customer agreement eka auto select wenna oni vehic type ekata saha customert adala
                booking.setCustomer_agreement_id(
                    customerAgreementRepository.findByVehicleTypeIdAndCustomerId(
                        booking.getCustomer_id().getId(),
                        booking.getVehicle_type_id().getId()  
                    )
                );

                // set user status into inproccess
                booking.setBooking_status_id(bookingStatusRepository.getReferenceById(1));


                // save operator
                bookingRepository.save(booking);

                // return ok
                return "ok";
            } catch (Exception e) {
                return "Save Not Completed :" + e.getMessage();
            }
         } else {

        return "Save Not Successed : You have not access";
    }


    }

    // get mapping for booking upadate into table(url -->/booking/update)
    @PutMapping(value = "/booking/update")
    public String updateBooking(@RequestBody Booking booking) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Booking");

        User logeduser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_update()) {
        // check ext
        if (booking.getId() == null) {
            return "Update Not Success: Booking not found";
        }

        Booking extBookingId = bookingRepository.getReferenceById(booking.getId());
        if (extBookingId == null) {
            return "Update Not Success: Vooking not Exist";
        }
//        save auto added data
        try{
            booking.setUpdated_datetime(LocalDateTime.now());
            booking.setUpdated_user_id(logeduser.getId());

            bookingRepository.save(booking);

            return "ok";
        }catch (Exception e){
            return "Update Not Completed :" + e.getMessage();
        }
        } else {

            return "Save Not Successed : You have not access";
        }
    }

    // get mapping for booking delete into table(url -->/booking/delete)
    @DeleteMapping(value = "/booking/delete")
    public String deleteBooking(@RequestBody Booking booking) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Booking");
        User logeduser = userRepository.getByUsername(auth.getName());

//        check existing
        if (userPrivilage.getPrivi_delete()) {
            if (booking.getId() == null) {
                return "Delete Not Completed :" + booking.getBooking_no();
            }
            Booking extBookingId = bookingRepository.getReferenceById(booking.getId());
            if (extBookingId == null) {
                return "Update Not Success: Vooking not Exist";
            }

            try {
//            set auto added data
                booking.setDeleted_datetime(LocalDateTime.now());
                booking.setDeletd_user_id(logeduser.getId());
                booking.setBooking_status_id(bookingStatusRepository.getReferenceById(7));

//            save operator
                bookingRepository.save(booking);

//            return msg
                return "ok";
            }catch (Exception e){
                return "Delete Not Completed :" + e.getMessage();
            }
        }  else {

        return "Save Not Successed : You have not access";
    }

    }

    // get mapping for get inprocess booking data (url -->/booking/bystatus)
    @RequestMapping(value = "/booking/bystatus")
    public List<Booking> getAllBookingDataByStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Booking");

        if (userPrivilage.getPrivi_select()) {
            return bookingRepository.getByStatus();
        }else {
            return new ArrayList<>();
        }

    }

    // get mapping for get inprocess booking data (url -->/booking/bystatus)
    @RequestMapping(value = "/booking/bystatusdepartedfromdeliverystatus")
    public List<Booking> getAllBookingDataByDepartedFromDeliveryStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Booking");

            return bookingRepository.getByDepartedFromDeliveryStatus();


    }



    // Get mapping for get all booking data by given customer id (url
    // -->/booking/bycustomerid?customerid=1)
    @GetMapping(value = "/booking/bycustomerid", params = { "customerid" }, produces = "application/json")
    // param method eka haraha thama data ganne
    public List<Booking> getPackageByVehicleType(@RequestParam("customerid") Integer customerid) {
        return bookingRepository.getBookingByCustomer(customerid);
    }
}
