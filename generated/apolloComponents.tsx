export type Maybe<T> = T | null;

export interface PageInput {
  title: string;

  slug: string;

  content: string;
}

export interface CreatePostInput {
  title: string;

  slug: string;

  content: string;
}

export interface EditPostInput {
  id: string;

  title: string;

  slug: string;

  content: string;
}

export interface ChangePasswordInput {
  password: string;

  token: string;
}

export interface RegisterInput {
  password: string;

  firstName: string;

  lastName: string;

  email: string;
}

export interface UserMetaInput {
  key: string;

  value: string;

  userId: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export type CreatePostVariables = {
  data: CreatePostInput;
};

export type CreatePostMutation = {
  __typename?: "Mutation";

  createPost: CreatePostCreatePost;
};

export type CreatePostCreatePost = {
  __typename?: "Post";

  id: string;

  title: string;

  slug: string;

  content: string;
};

export type EditPostVariables = {
  data: EditPostInput;
};

export type EditPostMutation = {
  __typename?: "Mutation";

  editPost: EditPostEditPost;
};

export type EditPostEditPost = {
  __typename?: "Post";

  id: string;

  title: string;

  slug: string;

  content: string;
};

export type PostByIdVariables = {
  id: string;
};

export type PostByIdQuery = {
  __typename?: "Query";

  post: PostByIdPost;
};

export type PostByIdPost = {
  __typename?: "Post";

  id: string;

  slug: string;

  title: string;

  content: string;

  createdAt: DateTime;

  updatedAt: DateTime;

  user: PostByIdUser;
};

export type PostByIdUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  fullName: string;

  email: string;
};

export type PostBySlugVariables = {
  slug: string;
};

export type PostBySlugQuery = {
  __typename?: "Query";

  post: PostBySlugPost;
};

export type PostBySlugPost = {
  __typename?: "Post";

  id: string;

  slug: string;

  title: string;

  content: string;

  createdAt: DateTime;

  updatedAt: DateTime;

  user: PostBySlugUser;
};

export type PostBySlugUser = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  fullName: string;

  email: string;
};

export type PostsVariables = {};

export type PostsQuery = {
  __typename?: "Query";

  posts: PostsPosts[];
};

export type PostsPosts = {
  __typename?: "Post";

  id: string;

  slug: string;

  title: string;

  content: string;

  createdAt: DateTime;

  updatedAt: DateTime;

  user: PostsUser;
};

export type PostsUser = {
  __typename?: "User";

  id: string;

  fullName: string;
};

export type ChangePasswordVariables = {
  data: ChangePasswordInput;
};

export type ChangePasswordMutation = {
  __typename?: "Mutation";

  changePassword: Maybe<ChangePasswordChangePassword>;
};

export type ChangePasswordChangePassword = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;
};

export type ConfirmUserVariables = {
  token: string;
};

export type ConfirmUserMutation = {
  __typename?: "Mutation";

  confirmUser: boolean;
};

export type ForgotPasswordVariables = {
  email: string;
};

export type ForgotPasswordMutation = {
  __typename?: "Mutation";

  forgotPassword: boolean;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: Maybe<LoginLogin>;
};

export type LoginLogin = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  fullName: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type RegisterVariables = {
  data: RegisterInput;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;
};

export type HelloVariables = {};

export type HelloQuery = {
  __typename?: "Query";

  hello: string;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  fullName: string;
};

export type AddUserRoleVariables = {
  userId: string;
  role: string;
};

export type AddUserRoleMutation = {
  __typename?: "Mutation";

  createUserMeta: AddUserRoleCreateUserMeta;
};

export type AddUserRoleCreateUserMeta = {
  __typename?: "UserMeta";

  id: string;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

// ====================================================
// Components
// ====================================================

export const CreatePostDocument = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
export class CreatePostComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreatePostMutation, CreatePostVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreatePostMutation, CreatePostVariables>
        mutation={CreatePostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreatePostProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreatePostMutation, CreatePostVariables>
> &
  TChildProps;
export type CreatePostMutationFn = ReactApollo.MutationFn<
  CreatePostMutation,
  CreatePostVariables
>;
export function CreatePostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreatePostMutation,
        CreatePostVariables,
        CreatePostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreatePostMutation,
    CreatePostVariables,
    CreatePostProps<TChildProps>
  >(CreatePostDocument, operationOptions);
}
export const EditPostDocument = gql`
  mutation EditPost($data: EditPostInput!) {
    editPost(data: $data) {
      id
      title
      slug
      content
    }
  }
`;
export class EditPostComponent extends React.Component<
  Partial<ReactApollo.MutationProps<EditPostMutation, EditPostVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<EditPostMutation, EditPostVariables>
        mutation={EditPostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type EditPostProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<EditPostMutation, EditPostVariables>
> &
  TChildProps;
export type EditPostMutationFn = ReactApollo.MutationFn<
  EditPostMutation,
  EditPostVariables
>;
export function EditPostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        EditPostMutation,
        EditPostVariables,
        EditPostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    EditPostMutation,
    EditPostVariables,
    EditPostProps<TChildProps>
  >(EditPostDocument, operationOptions);
}
export const PostByIdDocument = gql`
  query PostById($id: ID!) {
    post(id: $id) {
      id
      slug
      title
      content
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;
export class PostByIdComponent extends React.Component<
  Partial<ReactApollo.QueryProps<PostByIdQuery, PostByIdVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<PostByIdQuery, PostByIdVariables>
        query={PostByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PostByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<PostByIdQuery, PostByIdVariables>
> &
  TChildProps;
export function PostByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PostByIdQuery,
        PostByIdVariables,
        PostByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    PostByIdQuery,
    PostByIdVariables,
    PostByIdProps<TChildProps>
  >(PostByIdDocument, operationOptions);
}
export const PostBySlugDocument = gql`
  query PostBySlug($slug: String!) {
    post(slug: $slug) {
      id
      slug
      title
      content
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;
export class PostBySlugComponent extends React.Component<
  Partial<ReactApollo.QueryProps<PostBySlugQuery, PostBySlugVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<PostBySlugQuery, PostBySlugVariables>
        query={PostBySlugDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PostBySlugProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<PostBySlugQuery, PostBySlugVariables>
> &
  TChildProps;
export function PostBySlugHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PostBySlugQuery,
        PostBySlugVariables,
        PostBySlugProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    PostBySlugQuery,
    PostBySlugVariables,
    PostBySlugProps<TChildProps>
  >(PostBySlugDocument, operationOptions);
}
export const PostsDocument = gql`
  query Posts {
    posts {
      id
      slug
      title
      content
      createdAt
      updatedAt
      user {
        id
        fullName
      }
    }
  }
`;
export class PostsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<PostsQuery, PostsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<PostsQuery, PostsVariables>
        query={PostsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PostsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<PostsQuery, PostsVariables>
> &
  TChildProps;
export function PostsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PostsQuery,
        PostsVariables,
        PostsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    PostsQuery,
    PostsVariables,
    PostsProps<TChildProps>
  >(PostsDocument, operationOptions);
}
export const ChangePasswordDocument = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
export class ChangePasswordComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ChangePasswordMutation, ChangePasswordVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ChangePasswordMutation, ChangePasswordVariables>
        mutation={ChangePasswordDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ChangePasswordProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ChangePasswordMutation, ChangePasswordVariables>
> &
  TChildProps;
export type ChangePasswordMutationFn = ReactApollo.MutationFn<
  ChangePasswordMutation,
  ChangePasswordVariables
>;
export function ChangePasswordHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChangePasswordMutation,
        ChangePasswordVariables,
        ChangePasswordProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ChangePasswordMutation,
    ChangePasswordVariables,
    ChangePasswordProps<TChildProps>
  >(ChangePasswordDocument, operationOptions);
}
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export class ConfirmUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<ConfirmUserMutation, ConfirmUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<ConfirmUserMutation, ConfirmUserVariables>
        mutation={ConfirmUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ConfirmUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ConfirmUserMutation, ConfirmUserVariables>
> &
  TChildProps;
export type ConfirmUserMutationFn = ReactApollo.MutationFn<
  ConfirmUserMutation,
  ConfirmUserVariables
>;
export function ConfirmUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ConfirmUserMutation,
        ConfirmUserVariables,
        ConfirmUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ConfirmUserMutation,
    ConfirmUserVariables,
    ConfirmUserProps<TChildProps>
  >(ConfirmUserDocument, operationOptions);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export class ForgotPasswordComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ForgotPasswordMutation, ForgotPasswordVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ForgotPasswordMutation, ForgotPasswordVariables>
        mutation={ForgotPasswordDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ForgotPasswordProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ForgotPasswordMutation, ForgotPasswordVariables>
> &
  TChildProps;
export type ForgotPasswordMutationFn = ReactApollo.MutationFn<
  ForgotPasswordMutation,
  ForgotPasswordVariables
>;
export function ForgotPasswordHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ForgotPasswordMutation,
        ForgotPasswordVariables,
        ForgotPasswordProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordVariables,
    ForgotPasswordProps<TChildProps>
  >(ForgotPasswordDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      fullName
    }
  }
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;
export class HelloComponent extends React.Component<
  Partial<ReactApollo.QueryProps<HelloQuery, HelloVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<HelloQuery, HelloVariables>
        query={HelloDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type HelloProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<HelloQuery, HelloVariables>
> &
  TChildProps;
export function HelloHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        HelloQuery,
        HelloVariables,
        HelloProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    HelloQuery,
    HelloVariables,
    HelloProps<TChildProps>
  >(HelloDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      fullName
    }
  }
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
export const AddUserRoleDocument = gql`
  mutation AddUserRole($userId: ID!, $role: String!) {
    createUserMeta(data: { userId: $userId, value: $role, key: "role" }) {
      id
    }
  }
`;
export class AddUserRoleComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddUserRoleMutation, AddUserRoleVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddUserRoleMutation, AddUserRoleVariables>
        mutation={AddUserRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddUserRoleProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddUserRoleMutation, AddUserRoleVariables>
> &
  TChildProps;
export type AddUserRoleMutationFn = ReactApollo.MutationFn<
  AddUserRoleMutation,
  AddUserRoleVariables
>;
export function AddUserRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddUserRoleMutation,
        AddUserRoleVariables,
        AddUserRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddUserRoleMutation,
    AddUserRoleVariables,
    AddUserRoleProps<TChildProps>
  >(AddUserRoleDocument, operationOptions);
}
