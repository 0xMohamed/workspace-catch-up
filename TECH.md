# TanStack Start

## What is it?

TanStack Start is a full-stack React framework built around TanStack Router. It provides features such as server-side rendering (SSR), server functions, routing, and data loading while still giving developers a relatively flexible application architecture.

Compared with more opinionated full-stack React frameworks, I like that TanStack Start gives me more control over how I structure the application while still providing the capabilities needed for a modern full-stack application.

It is also part of the wider TanStack ecosystem, which includes tools such as TanStack Router, Query, Store, and Charts. The ecosystem has been growing quickly and provides strong developer tooling and DevTools across its libraries.

## How could Stunning use it?

TanStack Start is a good fit for an AI product like Stunning because it can keep a React application and lightweight server-side functionality close together.

For example, AI-related server logic, API calls, validation, and shared TypeScript types can live alongside the frontend without requiring a separate backend service for every simple server-side operation.

It also provides a strong routing and data-loading model through TanStack Router, including features such as loading states and preloading. This can be useful as Stunning grows from a simple AI interface into a larger application with multiple routes, sessions, integrations, and authenticated experiences.

For a larger version of the product, I would not assume that everything should remain in a single application. If the backend becomes complex enough, a separate backend or a monorepo could make more sense. TanStack Start is useful here because it does not force that decision too early.

## Limitations

The main limitation I see is maturity and ecosystem size compared with more established full-stack React frameworks.

TanStack is evolving quickly, which is a strength, but it also means APIs and patterns can change more frequently. Teams adopting it should be comfortable keeping dependencies up to date and adapting to changes.

Its ecosystem is also smaller than the ecosystem around frameworks such as Next.js, which can mean fewer examples, integrations, and community resources for some use cases.

Because of that, I would be more cautious about using TanStack Start for a large team that depends heavily on a very stable and established framework ecosystem.

## Would I use it today?

Yes. I would use TanStack Start today, especially for products where I want a React-based full-stack architecture with a high degree of flexibility.

I am currently using TanStack technologies in another project, and I like the way the ecosystem lets me choose the level of abstraction I actually need. I would not automatically use TanStack Start for every React application, though.

For a simple client-side application, using React with only the specific TanStack libraries that are needed may be a better choice. For an application that needs routing, server-side functionality, SSR, and a more complete full-stack architecture, TanStack Start becomes a much stronger option.

That flexibility is one of the main reasons I would choose it.
