import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef
} from "@angular/core";
import {ProgrammingExplanationComponent} from "./programming-explanation/programming-explanation.component";

@Injectable()
export default class ComponentBuilderService {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  createComponent(type: Type<any>, container: ViewContainerRef): ComponentRef<any> {
    container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(type);
    return container.createComponent(factory);
  }

}
