import * as PiStation from "../../node_modules/pistation-definitions/PiStation";
import {Connector433} from "../../connectors/connector-433/connector433.connector";
import {Module} from "../../app/module";
import {Observable} from 'rxjs/Rx';

export class Kaku extends Module {
    static moduleId:string;

    protected connector:Connector433;

    constructor(app){
        super('Kaku');

        this.connector = app.getConnector('connector-433');

        this.addFunction(
            new PiStation.Function('enableKakuSwitch', [
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
            new PiStation.Function('disableKakuSwitch', [
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
            new PiStation.Function('dimKaku', [
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

    enableKakuSwitch(args){
        var address = args.address;
        var unit = args.unit;
        var switchEnabled = this.connector.enableKaku(address, unit);

        switchEnabled.subscribe(
            (e)=>console.log('Now with observable update stream when message is send queue and update data from exec callback', e),
            (e)=>{console.log('erroorrrrrrrr', e)},
            () => console.log('kaku message command completed!'));

        return switchEnabled.map((event=> {
            return {value: 'KaKu switch enabled! '}
        }));
    }

    disableKakuSwitch(args){
        var address = args.address;
        var unit = args.unit;
        var switchDisabled = this.connector.disableKaku(address, unit);

        return switchDisabled.map((event=> {
            return {value: 'KaKu switch disabled! '}
        }));
    }

    dimKaku(args){
        var address = args.address;
        var unit = args.unit;
        var dim = args.dim;
        var switchDimmed = this.connector.dimKaku(address, unit, +dim);

        return switchDimmed.map((event=> {
            return {value: 'KaKu dimmed! '}
        }));
    }
}