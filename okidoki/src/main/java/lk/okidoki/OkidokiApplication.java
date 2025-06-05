package lk.okidoki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication

@RestController
public class OkidokiApplication {

	public static void main(String[] args) {
		SpringApplication.run(OkidokiApplication.class, args);
		System.out.println("");
		System.out.println("-------------------------------------It's Working----------------------------------------------");
		System.out.println("");

	}

	// Request mapping for load index ui (url -->/index)
	@RequestMapping(value = "/index")
	public ModelAndView indexPage() {

		ModelAndView indexUi = new ModelAndView();
		indexUi.setViewName("index.html");
		return indexUi;
	}


}
