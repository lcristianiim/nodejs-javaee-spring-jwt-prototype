package org.backendcore.ceremonies;

import javax.ws.rs.core.Application;
import javax.ws.rs.ApplicationPath;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("api")
public class JAXRSConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(JwtAuthVerifier.class);
//        classes.add(BasicAuthVerifier.class);
        classes.add(HelloWorldResource.class);

        return classes;
    }
}
