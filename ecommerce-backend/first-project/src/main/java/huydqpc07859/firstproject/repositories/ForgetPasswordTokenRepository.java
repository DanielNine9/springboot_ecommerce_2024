package huydqpc07859.firstproject.repositories;

import huydqpc07859.firstproject.model.user.ForgetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgetPasswordTokenRepository extends JpaRepository<ForgetPasswordToken, Long> {
    Optional<ForgetPasswordToken> findByToken(String token);
}
