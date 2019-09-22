package org.backendcore.ceremonies;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.Verification;
import org.h2.util.StringUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@ApplicationScoped
@Provider
@JwtAuth
public class JwtAuthVerifier implements ContainerRequestFilter, ContainerResponseFilter {
    private static final String BEARER_TYPE = "Bearer";
    private static final String AUTHORIZATION_HEADER = "AuthorizationToken";
    private static final String SECRET = "123";

    private ThreadLocal<DecodedJWT> decodedJWT = new ThreadLocal<>();

    @Produces
    @RequestScoped
    public DecodedJWT inject() {
        return decodedJWT.get();
    }

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        try {
            String header = getAuthorizationHeader(containerRequestContext);
            decodeBearerToken(header);
        } catch (SecurityException e) {
            containerRequestContext
                    .abortWith(Response
                            .status(401, "Invalid token")
                            .entity(e.getMessage())
                            .build());
        }
    }

    private void decodeBearerToken(String authorization) {
        String token = extractJwtTokent(authorization);
        Verification verification = JWT.require(getSecret()).acceptLeeway(1L);
        DecodedJWT jwt = verify(token, verification);
        decodedJWT.set(jwt);
    }

    private Algorithm getSecret() {
        return Algorithm.HMAC256(SECRET);
    }

    private String extractJwtTokent(String authorization) {
        if (StringUtils.isNullOrEmpty(authorization))
            throw new SecurityException("Authorization Required");

        String[] parts = authorization.split(" ");
        if (!BEARER_TYPE.equals(parts[0]))
            throw new SecurityException("The following authorization is not supported: " + parts[0]);

        return parts[1];
    }

    private DecodedJWT verify(String token, Verification verification) {
        try {
            JWTVerifier verifier = verification.build();
            return verifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new SecurityException("Invalid JWT token", e);
        }
    }

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {
        decodedJWT.remove();
    }

    private String getAuthorizationHeader(ContainerRequestContext request) {
        return request.getHeaderString(AUTHORIZATION_HEADER);
    }
}
