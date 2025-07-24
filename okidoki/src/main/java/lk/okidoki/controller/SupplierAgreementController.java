package lk.okidoki.controller;

import lk.okidoki.modal.Privilage;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import lk.okidoki.modal.SupplierAgreement;
import lk.okidoki.modal.User;
import lk.okidoki.repository.SupplierAgreementRepository;
import lk.okidoki.repository.SupplierAgreementStatusRepository;

import lk.okidoki.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class SupplierAgreementController {

    @Autowired
    private SupplierAgreementRepository supplierAgreementRepository;

    @Autowired
    private SupplierAgreementStatusRepository supplierAgreementStatusRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPrivilageController userPrivilageController;

    // Request mapping for load supplier agreement Ui (url -->/supplieragreement)
    @RequestMapping("/supplieragreement")
    public ModelAndView loadSupplierAgreementUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User logeduser = userRepository.getByUsername(auth.getName());

        ModelAndView supplierAgreementUI = new ModelAndView();
        supplierAgreementUI.setViewName("supplieragreement.html");
        supplierAgreementUI.addObject("logedusername", auth.getName());
        supplierAgreementUI.addObject("loggeduserphoto", logeduser.getUser_photo());
        supplierAgreementUI.addObject("pageTitle", "Supplier Agreement");
        return supplierAgreementUI;

    }


    
    // Get mapping for get all supplier agreement data by (url
    // -->/supplieragreement/alldata)
    @GetMapping(value = "/supplieragreement/alldata", produces = "application/json")
    public List<SupplierAgreement> getAllSupplierAgreementData() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Supplier Agreement");

        if (userPrivilage.getPrivi_select()) {
        return supplierAgreementRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    } else {
        return new ArrayList<>();
    }
    }

    // post mapping for save supplier agreement data (url
    // -->/supplieragreement/save)
    @PostMapping(value = "/supplieragreement/insert")
    public String saveSupplierAgreementData(@RequestBody SupplierAgreement supplierAgreement) {

        // check autheentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Supplier Agreement");
        User logeduser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_insert()) {
        // check existing
        // vehicel no
        SupplierAgreement exSupplierAgreementByVehicleNo = supplierAgreementRepository
                .getByVehicelNo(supplierAgreement.getVehicle_id());
        if (exSupplierAgreementByVehicleNo != null) {
            return "Vehicle No already exists";
        }

        try {

            // set added by and added date time
            supplierAgreement.setAdded_datetime(LocalDateTime.now());
            supplierAgreement.setAdded_user_id(logeduser.getId());
            supplierAgreement.setSup_agreement_no(supplierAgreementRepository.getNextSupplierAgreementNo());

            // set supplier agreement status to pending
            supplierAgreement.setSupplier_agreement_status_id(supplierAgreementStatusRepository.getReferenceById(1));

            // save save operator
            supplierAgreementRepository.save(supplierAgreement);

            // return ok
            return "ok";

        } catch (Exception e) {

            return "Save Not Completed :" + e.getMessage();
        }
        } else {

            return "Save Not Successed : You have not access";
        }
    }


     // Requset update mapping for update supplier agreement from the table(url
    // -->/supplieragreement/update)
    @PutMapping(value = "/supplieragreement/update")
    public String updateCustomerAgreementData(@RequestBody SupplierAgreement supplierAgreement) {

        // Check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Supplier Agreement");
        User logedUser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_update()) {

            // check duplicate
        SupplierAgreement extByVehicleNo = supplierAgreementRepository.getByVehicelNo(supplierAgreement.getVehicle_id());
        if (extByVehicleNo != null && extByVehicleNo.getId() != supplierAgreement.getId()){
            return "Vehicle No already exists";
        }
     
        try {

            // set auto added value
            supplierAgreement.setUpdated_datetime(LocalDateTime.now());
            supplierAgreement.setUpdated_user_id(logedUser.getId());
            // set status to pending
            supplierAgreement.setSupplier_agreement_status_id(supplierAgreementStatusRepository.getReferenceById(1));

            // save data
            supplierAgreementRepository.save(supplierAgreement);

            // return success message
            return "ok";

        } catch (Exception e) {
            return "Update Not Completed :" + e.getMessage();
        }
    } else {

        return "Save Not Successed : You have not access";
    }

    }

    

    // Requset delete mapping for delete supplier agreement from the table(url
    // -->/customeragreement/delete)
    @DeleteMapping(value = "/supplieragreement/delete")
    public String deleteCustomerAgreementData(@RequestBody SupplierAgreement supplierAgreement) {

        // check authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Supplier Agreement");
        User logedUser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_delete()) {
        // check existing
        if (supplierAgreement.getId() == null) {
            return "Delete Not Completed : Agreement No Found";
        }
        // database eke thiyenwd balanna oni
        SupplierAgreement extSupplierAgreement = supplierAgreementRepository
                .getReferenceById(supplierAgreement.getId());
        if (extSupplierAgreement == null) {
            return "Delete Not Completed : Agreement No Not Found";

        }

        try {
            // set default values
            supplierAgreement.setDeleted_datetime(LocalDateTime.now());
            supplierAgreement.setDeleted_user_id(logedUser.getId());
            // set status to deleted
            supplierAgreement.setSupplier_agreement_status_id(supplierAgreementStatusRepository.getReferenceById(4));

            // save data
            supplierAgreementRepository.save(supplierAgreement);

            // return success message
            return "ok";
        } catch (Exception e) {
            return "Delete Not Completed :" + e.getMessage();
        }
    } else {

        return "Save Not Successed : You have not access";
        }
    }

    //Getmapping for get supplier by
}
