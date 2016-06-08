import * as PiStation from "../../node_modules/pistation-definitions/PiStation.ts";
import {Connector433} from "../../connectors/connector-433/connector433.connector";
import {Observable} from 'rxjs/Rx';
import {Module} from "../../app/module";

export class Kaku extends Module {
    static moduleId:string;

    protected connector:Connector433;

    constructor(app){
        super('Kaku');

        this.connector = app.getConnector('connector-433');

        this.addFunction(
            new PiStation.Function('enableLight', [
                new PiStation.ArgumentTextbox({
                    key:'address',
                    label:'address',
                    value:true,
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'unit',
                    label:'Unit',
                    value:true,
                    required: true
                }),
            ])
        );

        this.addFunction(
            new PiStation.Function('disableLight', [
                new PiStation.ArgumentTextbox({
                    key:'address',
                    label:'address',
                    value:true,
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'unit',
                    label:'Unit',
                    value:true,
                    required: true
                }),
            ])
        );

        this.addFunction(
            new PiStation.Function('dimLight', [
                new PiStation.ArgumentTextbox({
                    key:'address',
                    label:'address',
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'unit',
                    label:'Unit',
                    required: true
                }),
                new PiStation.ArgumentTextbox({
                    key:'dim',
                    label:'Dim level (0 - 15)',
                    required: true
                }),
            ])
        );
    }


    //powerControl(finishCallback: ()=>void, enabled : boolean) {
    //    //do module shit
    //    console.log('Powercontrol ran with enabled var being ', enabled);
    //    setTimeout(function() {
    //        finishCallback();
    //    }, 5000);
    //    //finishCallback();
    //    //connector433.enable();
    //}



    enableLight(address:string, unit:string){
        console.log(`Module call enable light`, address, unit);

        this.connector.enableKaku(address, unit, function(){console.log('Muh callback')});

        /*
        const dummyFunctionUpdates = Observable //dummy update stream from connector
            .interval(500)
            .timeInterval()
            .take(3);

        return dummyFunctionUpdates;
        */
    }
}