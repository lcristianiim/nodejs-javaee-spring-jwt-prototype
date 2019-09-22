package oauth2.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import oauth2.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  boolean existsByUsername(String username);
  boolean existsByEmail(String email);

  User findByEmail(String email);

  @Transactional
  void deleteByEmail(String email);

}
