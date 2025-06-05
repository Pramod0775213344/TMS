package lk.okidoki.controller;

import lk.okidoki.modal.Privilage;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.okidoki.modal.User;
import lk.okidoki.modal.Vehicle;
import lk.okidoki.repository.UserRepository;
import lk.okidoki.repository.VehicleRepository;
import lk.okidoki.repository.VehicleStatusRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleStatusRepository vehicleStatusRepository;


    @Autowired// auto generate instance
    private UserPrivilageController userPrivilageController;


    // Request mapping for load vehicle Ui (url -->/vehicle)
    @RequestMapping(value = "/vehicle")
    public ModelAndView loadVehicleUI() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView vehicleUI = new ModelAndView();
        vehicleUI.setViewName("vehicle.html");
        vehicleUI.addObject("logedusername", auth.getName());
        return vehicleUI;
    }

    // Get mapping for get all vehicle data by (url -->/vehicle/alldata)
    @GetMapping(value = "/vehicle/alldata", produces = "application/json")
    public List<Vehicle> getAllVehicleData() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Vehicle");
        if (userPrivilage.getPrivi_select()) {

        return vehicleRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));

        } else {
            return new ArrayList<>();
        }
    }

    // Get mapping for get vehicle by supplier id (url -->/vehicle/byvehicletype?vehicletypeid=1)
    @GetMapping(value = "/vehicle/byvehicletype",params = {"vehicletypeid"}, produces = "application/json")
    public List<Vehicle> getVehicleByVehicleType(@RequestParam("vehicletypeid") Integer vehicletypeid) {
        return vehicleRepository.getVehicleByVehicleType(vehicletypeid);
    }

    // Get mapping for get vehicle by supplier id (url -->/vehicle/bysupplierid?supplierid=1)
    @GetMapping(value = "/vehicle/bysupplierid",params = {"supplierid"}, produces = "application/json")
    public List<Vehicle> getMethodName(@RequestParam("supplierid") Integer supplierid) {
        return vehicleRepository.getVehicleBySupplierId(supplierid);
    }
    

    // get mapping for insert vehicle into tha table(url -->/vehicle/insert)
    @PostMapping(value = "vehicle/insert")
    public String saveVehicleDtaa(@RequestBody Vehicle vehicle) {

        // authorization and authentication
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Vehicle");
        User logeduser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_insert()) {
        // check existing

        // chekc vehicle no
        Vehicle extVehicle = vehicleRepository.getByVehicleNo(vehicle.getVehicle_no());
        if (extVehicle != null) {
            return "Vehicle no already exist";
        }

        try {

            // set audit data
            vehicle.setAdded_datetime(LocalDateTime.now());
            vehicle.setAdded_user_id(logeduser.getId());

            // save vehicle data
            vehicleRepository.save(vehicle);

            // return success message
            return "ok";

        } catch (Exception e) {

            return "Save not completed" + e.getMessage();
        }
    } else {

        return "Save Not Successed : You have not access";
    }
    }

    // get mapping for update vehicle into tha table(url -->/vehicle/update)
    @PutMapping(value = "vehicle/update")
    public String updateVehicleData(@RequestBody Vehicle vehicle) {

        // checek authorization and authentication
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Vehicle");
        User logeduser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_update()) {
        // check existing
        if (vehicle.getId() == null) {
            return "Vehicle id is null";
        }

        Vehicle extVehicle = vehicleRepository.getReferenceById(vehicle.getId());
        if (extVehicle == null) {
            return "Vehicle not exist";
        }

        // duplicate check
        // check vehicle no
        Vehicle extVehicleByVehicleNo = vehicleRepository.getByVehicleNo(vehicle.getVehicle_no());
        if (extVehicleByVehicleNo != null && extVehicleByVehicleNo.getId() != vehicle.getId()) {
            return "Vehicle no already exist";
        }

        try {

            // set audit data
            vehicle.setUpdated_datetime(LocalDateTime.now());
            vehicle.setUpdated_user_id(logeduser.getId());

            // save vehicle data
            vehicleRepository.save(vehicle);

            // return success message
            return "ok";

        } catch (Exception e) {
            return "Update not completed" + e.getMessage();
        }
    } else {

        return "Update Not Successed : You have not access";
    }

    }


    // delete mapping for delete vehicle into tha table(url -->/vehicle/delete)
    @DeleteMapping(value = "vehicle/delete")
    public String deleteVehicleData(@RequestBody Vehicle vehicle) {

        // checek authorization and authentication
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilage userPrivilage = userPrivilageController.getUserPrivilageByUserModule(auth.getName(), "Vehicle");
        User logeduser = userRepository.getByUsername(auth.getName());

        if (userPrivilage.getPrivi_delete()) {
        // check existing
        if (vehicle.getId() == null) {
            return "Vehicle not exist";
        }

        Vehicle extVehicle = vehicleRepository.getReferenceById(vehicle.getId());
        if (extVehicle == null) {
            return "Vehicle not exist";
        }

        try {

            // set audit data
            vehicle.setDeleted_datetime(LocalDateTime.now());
            vehicle.setDeleted_user_id(logeduser.getId());
            vehicle.setVehicle_status_id(vehicleStatusRepository.getReferenceById(3));

            // save vehicle data
            vehicleRepository.save(vehicle);

            // return success message
            return "ok";

        } catch (Exception e) {
            return "Delete not completed" + e.getMessage();
        }
    } else {

        return "Delete Not Successed : You have not access";
    }

    }


}
