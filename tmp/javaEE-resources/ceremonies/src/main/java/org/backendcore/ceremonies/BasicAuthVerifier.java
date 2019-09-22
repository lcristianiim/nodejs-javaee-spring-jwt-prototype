package org.backendcore.ceremonies;

import com.auth0.jwt.interfaces.DecodedJWT;

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
@BasicAuth
public class BasicAuthVerifier implements ContainerRequestFilter, ContainerResponseFilter {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String USERNAME = "app";
    private static final String SECRET = "secret";

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
            decodeCredentials(header);
        } catch (SecurityException e) {
            containerRequestContext
                    .abortWith(Response
                            .status(401, "Invalid credentials")
                            .entity(e.getMessage())
                            .build());
        }
    }

    private void decodeCredentials(String header) {
        throw new SecurityException("Hello! The credentials are not good");
    }

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {
        decodedJWT.remove();
    }

    private String getAuthorizationHeader(ContainerRequestContext request) {
        return request.getHeaderString(AUTHORIZATION_HEADER);
    }
}
