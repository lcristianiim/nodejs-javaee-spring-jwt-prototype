package oauth2.controller;

import oauth2.model.User;
import oauth2.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserOperations {
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/user", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            JSONObject message = new JSONObject();
            message.put("message", "This email is already registered");
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).body(message);
        }

        userRepository.save(user);

        return ResponseEntity.ok().body("User has been Created");
    }
}
