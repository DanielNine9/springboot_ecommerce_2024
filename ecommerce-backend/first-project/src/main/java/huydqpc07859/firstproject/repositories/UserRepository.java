package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.user.Role;
import huydqpc07859.firstproject.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String mail);

    List<User> findByEmailContainingIgnoreCaseAndRoleIn(String email, List<Role> roles);

}
