import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Observable } from "rxjs";

/*
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private oSessionService: SessionService
    ) { }
        
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.oSessionService.isSessionActive()) {
            const token = this.oSessionService.getToken();
            if (token) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });
                return next.handle(cloned);
            }
            else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }
        
    }
    */

    export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    
        // Inject the current `AuthService` and use it to get an authentication token:
        const token = inject(SessionService).getToken();
        //const authToken = inject(AuthService).getAuthToken();
        // Clone the request to add the authentication header.
        if (token) {
            const newReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next(newReq);
        } else {
            return next(req);
        }
    } 
    
