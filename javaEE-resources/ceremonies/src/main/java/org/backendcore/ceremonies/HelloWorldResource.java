package org.backendcore.ceremonies;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.Map;

@Path("/hello")
@RequestScoped
//@BasicAuth
@JwtAuth
public class HelloWorldResource {

    @GET
    @Path("/cris")
    @Produces(MediaType.APPLICATION_JSON)
    public Response helloWorld() {
        Map<String, String> response = Collections.singletonMap("message", "Hello World is working!!!");
        return Response.ok(response).build();
    }
}
