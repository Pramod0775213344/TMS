package lk.okidoki.controller;

import lk.okidoki.modal.Privilage;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.okidoki.modal.CustomerAgreement;
import lk.okidoki.modal.User;
import lk.okidoki.repository.CustomerAgreementRepository;
import lk.okidoki.repository.CustomerAgreementStatusRepository;
import lk.okidoki.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class CustomerAgreementController {

    @Autowired
    private CustomerAgreementRepository customerAgreementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerAgreementStatusRepository customerAgreementStatusRepository;

    @Autowired// auto generate instance
    private UserPrivilageController userPrivilageController;

    // Request mapping for load customeragreement Ui (url -->/customeragreement)
    @RequestMapping(value = "/customeragreement")
    public ModelAndView loadCustomerAgreementUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView customerAgreementUI = new ModelAndView();
        customerAgreementUI.setViewName("customerAgreement.html");
        customerAgreementUI.addObject("logedusername", auth.getName());
        return customerAgreementUI;
    }

    
   

    // Request mapping for get all customeragreement data (url
    // -->/customeragreement/alldata)
    @RequestMapping(value = "/customeragreement/alldata", produces = "application/json")
    public List<CustomerAgreement> getCustomerAgreementAllData() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Customer Agreement");

        if (userPrivilage.getPrivi_select()) {
        return customerAgreementRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        } else {
            return new ArrayList<>();
        }
    }


    // Requset post mapping for insert data in to the customer agreement table(url
    // -->/customeragreement/insert)
    @PostMapping(value = "/customeragreement/insert")
    public String saveCustomerAgreementData(@RequestBody CustomerAgreement customerAgreement) {

        // check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Customer Agreement");
        User logeduser = userRepository.getByUsername(auth.getName());


        if (userPrivilage.getPrivi_insert()) {
        // check existing
//            ekama vehicle type eken customer keneta agreement dekak gahanna ba
            Integer vehicleTypeId = customerAgreement.getVehicle_type_id().getId(); // Extract the ID from VehicleType
            Integer  customerId = customerAgreement.getCustomer_id().getId();
            CustomerAgreement extAgreementByVehicleType = customerAgreementRepository.findByVehicleTypeIdAndCustomerId(customerId,vehicleTypeId);
            if (extAgreementByVehicleType != null) {
                return "Save Not Completed :Following customer already have this agreement  Exists";
            }
        // existing customer can not have same agreement
        CustomerAgreement extCustomerByVehicleTypeAndPackageType = customerAgreementRepository
                .getByVehicleTypeAndPackageType(customerAgreement.getCustomer_id(),
                        customerAgreement.getVehicle_type_id(), customerAgreement.getPackage_id());
        if (extCustomerByVehicleTypeAndPackageType != null) {
            return "Save Not Completed :Following customer already have this agreement  Exists";

        }

        try {
            // set default values
            customerAgreement.setAdded_datetime(LocalDateTime.now());
            customerAgreement.setAdded_user_id(logeduser.getId());
            customerAgreement.setCus_agreement_no(customerAgreementRepository.getNextAgreementNo());
            // set status to pending
            customerAgreement.setCustomer_agreement_status_id(customerAgreementStatusRepository.getReferenceById(1));

            // save data
            customerAgreementRepository.save(customerAgreement);

            // return success message
            return "ok";
        } catch (Exception e) {
            return "Save Not Completed :" + e.getMessage();
        }
    } else {

        return "Save Not Successed : You have not access";
    }
    }


    // Requset put mapping for update customer agreement from the table(url
    // -->/customeragreement/update)
    @PutMapping(value = "/customeragreement/update")
    public String updateCustomerAgreementData(@RequestBody CustomerAgreement customerAgreement) {

        // Check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Customer Agreement");
        User logedUser = userRepository.getByUsername(auth.getName());
        if (userPrivilage.getPrivi_update()) {
        // check duplicate
        CustomerAgreement extCustomerByVehicleTypeAndPackageType = customerAgreementRepository
                .getByVehicleTypeAndPackageType(customerAgreement.getCustomer_id(),
                        customerAgreement.getVehicle_type_id(), customerAgreement.getPackage_id());
        if (extCustomerByVehicleTypeAndPackageType != null && extCustomerByVehicleTypeAndPackageType.getId() != customerAgreement.getId()) {
            return "Update Not Completed :Following customer already have this agreement  Exists";

        }

        try {

            // set auto added value
            customerAgreement.setUpdated_datetime(LocalDateTime.now());
            customerAgreement.setUpdated_user_id(logedUser.getId());
            // set status to pending
            customerAgreement.setCustomer_agreement_status_id(customerAgreementStatusRepository.getReferenceById(1));

            // save data
            customerAgreementRepository.save(customerAgreement);

            // return success message
            return "ok";

        } catch (Exception e) {
            return "Update Not Completed :" + e.getMessage();
        }
    } else {

        return "Update Not Successed : You have not access";
    }

    }

    
    // Requset delete mapping for delete customer agreement from the table(url
    // -->/customeragreement/delete)
    @DeleteMapping(value = "/customeragreement/delete")
    public String deleteCustomerAgreementData(@RequestBody CustomerAgreement customerAgreement) {

        // check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Customer Agreement");
        User logedUser = userRepository.getByUsername(auth.getName());
        if (userPrivilage.getPrivi_delete()) {
        // check existing
        if (customerAgreement.getId() == null) {
            return "Delete Not Completed : Agreement No Found";
        }
        // database eke thiyenwd balanna oni
        CustomerAgreement extCustomerAgreement = customerAgreementRepository
                .getReferenceById(customerAgreement.getId());
        if (extCustomerAgreement == null) {
            return "Delete Not Completed : Agreement No Not Found";

        }

        try {
            // set default values
            customerAgreement.setDeleted_datetime(LocalDateTime.now());
            customerAgreement.setDeleted_user_id(logedUser.getId());
            // set status to deleted
            customerAgreement.setCustomer_agreement_status_id(customerAgreementStatusRepository.getReferenceById(4));

            // save data
            customerAgreementRepository.save(customerAgreement);

            // return success message
            return "ok";
        } catch (Exception e) {
            return "Delete Not Completed :" + e.getMessage();
        }
    } else {

        return "Delete Not Successed : You have not access";
    }
    }


  
}
