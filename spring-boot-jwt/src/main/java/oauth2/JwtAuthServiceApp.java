package oauth2;

import java.util.ArrayList;
import java.util.Collections;

import oauth2.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import oauth2.model.Role;
import oauth2.model.User;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableResourceServer
public class JwtAuthServiceApp implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(JwtAuthServiceApp.class, args);
  }

  @Autowired
  private UserRepository userRepository;

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Override
  public void run(String... params) throws Exception {
    User admin = new User();
    admin.setUsername("admin");
    admin.setPassword("admin123456789");
    admin.setEmail("admin@email.com");
    admin.setRoles(new ArrayList<Role>(Collections.singletonList(Role.ROLE_ADMIN)));
    userRepository.save(admin);

    User client = new User();
    client.setUsername("client");
    client.setPassword("client123456789");
    client.setEmail("client@email.com");
    client.setRoles(new ArrayList<Role>(Collections.singletonList(Role.ROLE_GUEST)));
    userRepository.save(client);
  }

}
