import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  date: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "admins" */
export type Admins = {
  __typename?: 'admins';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password_hash: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  school_name: Scalars['String']['output'];
  /** An array relationship */
  uploads: Array<Uploads>;
  /** An aggregate relationship */
  uploads_aggregate: Uploads_Aggregate;
};


/** columns and relationships of "admins" */
export type AdminsUploadsArgs = {
  distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Uploads_Order_By>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};


/** columns and relationships of "admins" */
export type AdminsUploads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Uploads_Order_By>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};

/** aggregated selection of "admins" */
export type Admins_Aggregate = {
  __typename?: 'admins_aggregate';
  aggregate?: Maybe<Admins_Aggregate_Fields>;
  nodes: Array<Admins>;
};

/** aggregate fields of "admins" */
export type Admins_Aggregate_Fields = {
  __typename?: 'admins_aggregate_fields';
  avg?: Maybe<Admins_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Admins_Max_Fields>;
  min?: Maybe<Admins_Min_Fields>;
  stddev?: Maybe<Admins_Stddev_Fields>;
  stddev_pop?: Maybe<Admins_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Admins_Stddev_Samp_Fields>;
  sum?: Maybe<Admins_Sum_Fields>;
  var_pop?: Maybe<Admins_Var_Pop_Fields>;
  var_samp?: Maybe<Admins_Var_Samp_Fields>;
  variance?: Maybe<Admins_Variance_Fields>;
};


/** aggregate fields of "admins" */
export type Admins_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Admins_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Admins_Avg_Fields = {
  __typename?: 'admins_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "admins". All fields are combined with a logical 'AND'. */
export type Admins_Bool_Exp = {
  _and?: InputMaybe<Array<Admins_Bool_Exp>>;
  _not?: InputMaybe<Admins_Bool_Exp>;
  _or?: InputMaybe<Array<Admins_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  password_hash?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  school_name?: InputMaybe<String_Comparison_Exp>;
  uploads?: InputMaybe<Uploads_Bool_Exp>;
  uploads_aggregate?: InputMaybe<Uploads_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "admins" */
export type Admins_Constraint =
  /** unique or primary key constraint on columns "email" */
  | 'admins_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'admins_pkey';

/** input type for incrementing numeric columns in table "admins" */
export type Admins_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "admins" */
export type Admins_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  school_name?: InputMaybe<Scalars['String']['input']>;
  uploads?: InputMaybe<Uploads_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Admins_Max_Fields = {
  __typename?: 'admins_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  school_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Admins_Min_Fields = {
  __typename?: 'admins_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  school_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "admins" */
export type Admins_Mutation_Response = {
  __typename?: 'admins_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Admins>;
};

/** input type for inserting object relation for remote table "admins" */
export type Admins_Obj_Rel_Insert_Input = {
  data: Admins_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Admins_On_Conflict>;
};

/** on_conflict condition type for table "admins" */
export type Admins_On_Conflict = {
  constraint: Admins_Constraint;
  update_columns?: Array<Admins_Update_Column>;
  where?: InputMaybe<Admins_Bool_Exp>;
};

/** Ordering options when selecting data from "admins". */
export type Admins_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  school_name?: InputMaybe<Order_By>;
  uploads_aggregate?: InputMaybe<Uploads_Aggregate_Order_By>;
};

/** primary key columns input for table: admins */
export type Admins_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "admins" */
export type Admins_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'password_hash'
  /** column name */
  | 'phone'
  /** column name */
  | 'school_name';

/** input type for updating data in table "admins" */
export type Admins_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  school_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Admins_Stddev_Fields = {
  __typename?: 'admins_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Admins_Stddev_Pop_Fields = {
  __typename?: 'admins_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Admins_Stddev_Samp_Fields = {
  __typename?: 'admins_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "admins" */
export type Admins_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Admins_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Admins_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  school_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Admins_Sum_Fields = {
  __typename?: 'admins_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "admins" */
export type Admins_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'password_hash'
  /** column name */
  | 'phone'
  /** column name */
  | 'school_name';

export type Admins_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Admins_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Admins_Set_Input>;
  /** filter the rows which have to be updated */
  where: Admins_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Admins_Var_Pop_Fields = {
  __typename?: 'admins_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Admins_Var_Samp_Fields = {
  __typename?: 'admins_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Admins_Variance_Fields = {
  __typename?: 'admins_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "chat_participants" */
export type Chat_Participants = {
  __typename?: 'chat_participants';
  /** An object relationship */
  chat: Chats;
  chat_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  joined_at?: Maybe<Scalars['timestamp']['output']>;
  user_id: Scalars['Int']['output'];
  user_type: Scalars['String']['output'];
};

/** aggregated selection of "chat_participants" */
export type Chat_Participants_Aggregate = {
  __typename?: 'chat_participants_aggregate';
  aggregate?: Maybe<Chat_Participants_Aggregate_Fields>;
  nodes: Array<Chat_Participants>;
};

export type Chat_Participants_Aggregate_Bool_Exp = {
  count?: InputMaybe<Chat_Participants_Aggregate_Bool_Exp_Count>;
};

export type Chat_Participants_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Chat_Participants_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "chat_participants" */
export type Chat_Participants_Aggregate_Fields = {
  __typename?: 'chat_participants_aggregate_fields';
  avg?: Maybe<Chat_Participants_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Chat_Participants_Max_Fields>;
  min?: Maybe<Chat_Participants_Min_Fields>;
  stddev?: Maybe<Chat_Participants_Stddev_Fields>;
  stddev_pop?: Maybe<Chat_Participants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Chat_Participants_Stddev_Samp_Fields>;
  sum?: Maybe<Chat_Participants_Sum_Fields>;
  var_pop?: Maybe<Chat_Participants_Var_Pop_Fields>;
  var_samp?: Maybe<Chat_Participants_Var_Samp_Fields>;
  variance?: Maybe<Chat_Participants_Variance_Fields>;
};


/** aggregate fields of "chat_participants" */
export type Chat_Participants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "chat_participants" */
export type Chat_Participants_Aggregate_Order_By = {
  avg?: InputMaybe<Chat_Participants_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chat_Participants_Max_Order_By>;
  min?: InputMaybe<Chat_Participants_Min_Order_By>;
  stddev?: InputMaybe<Chat_Participants_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Chat_Participants_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Chat_Participants_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Chat_Participants_Sum_Order_By>;
  var_pop?: InputMaybe<Chat_Participants_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Chat_Participants_Var_Samp_Order_By>;
  variance?: InputMaybe<Chat_Participants_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "chat_participants" */
export type Chat_Participants_Arr_Rel_Insert_Input = {
  data: Array<Chat_Participants_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Chat_Participants_On_Conflict>;
};

/** aggregate avg on columns */
export type Chat_Participants_Avg_Fields = {
  __typename?: 'chat_participants_avg_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "chat_participants" */
export type Chat_Participants_Avg_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "chat_participants". All fields are combined with a logical 'AND'. */
export type Chat_Participants_Bool_Exp = {
  _and?: InputMaybe<Array<Chat_Participants_Bool_Exp>>;
  _not?: InputMaybe<Chat_Participants_Bool_Exp>;
  _or?: InputMaybe<Array<Chat_Participants_Bool_Exp>>;
  chat?: InputMaybe<Chats_Bool_Exp>;
  chat_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  joined_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
  user_type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat_participants" */
export type Chat_Participants_Constraint =
  /** unique or primary key constraint on columns "user_id", "chat_id" */
  | 'chat_participants_chat_id_user_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'chat_participants_pkey';

/** input type for incrementing numeric columns in table "chat_participants" */
export type Chat_Participants_Inc_Input = {
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "chat_participants" */
export type Chat_Participants_Insert_Input = {
  chat?: InputMaybe<Chats_Obj_Rel_Insert_Input>;
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  joined_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  user_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Chat_Participants_Max_Fields = {
  __typename?: 'chat_participants_max_fields';
  chat_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  joined_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  user_type?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "chat_participants" */
export type Chat_Participants_Max_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  joined_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Participants_Min_Fields = {
  __typename?: 'chat_participants_min_fields';
  chat_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  joined_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  user_type?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "chat_participants" */
export type Chat_Participants_Min_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  joined_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "chat_participants" */
export type Chat_Participants_Mutation_Response = {
  __typename?: 'chat_participants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Participants>;
};

/** on_conflict condition type for table "chat_participants" */
export type Chat_Participants_On_Conflict = {
  constraint: Chat_Participants_Constraint;
  update_columns?: Array<Chat_Participants_Update_Column>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_participants". */
export type Chat_Participants_Order_By = {
  chat?: InputMaybe<Chats_Order_By>;
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  joined_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: chat_participants */
export type Chat_Participants_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "chat_participants" */
export type Chat_Participants_Select_Column =
  /** column name */
  | 'chat_id'
  /** column name */
  | 'id'
  /** column name */
  | 'joined_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'user_type';

/** input type for updating data in table "chat_participants" */
export type Chat_Participants_Set_Input = {
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  joined_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  user_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Chat_Participants_Stddev_Fields = {
  __typename?: 'chat_participants_stddev_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "chat_participants" */
export type Chat_Participants_Stddev_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Chat_Participants_Stddev_Pop_Fields = {
  __typename?: 'chat_participants_stddev_pop_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "chat_participants" */
export type Chat_Participants_Stddev_Pop_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Chat_Participants_Stddev_Samp_Fields = {
  __typename?: 'chat_participants_stddev_samp_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "chat_participants" */
export type Chat_Participants_Stddev_Samp_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "chat_participants" */
export type Chat_Participants_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chat_Participants_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chat_Participants_Stream_Cursor_Value_Input = {
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  joined_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  user_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Chat_Participants_Sum_Fields = {
  __typename?: 'chat_participants_sum_fields';
  chat_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "chat_participants" */
export type Chat_Participants_Sum_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** update columns of table "chat_participants" */
export type Chat_Participants_Update_Column =
  /** column name */
  | 'chat_id'
  /** column name */
  | 'id'
  /** column name */
  | 'joined_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'user_type';

export type Chat_Participants_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Chat_Participants_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chat_Participants_Set_Input>;
  /** filter the rows which have to be updated */
  where: Chat_Participants_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Chat_Participants_Var_Pop_Fields = {
  __typename?: 'chat_participants_var_pop_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "chat_participants" */
export type Chat_Participants_Var_Pop_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Chat_Participants_Var_Samp_Fields = {
  __typename?: 'chat_participants_var_samp_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "chat_participants" */
export type Chat_Participants_Var_Samp_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Chat_Participants_Variance_Fields = {
  __typename?: 'chat_participants_variance_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "chat_participants" */
export type Chat_Participants_Variance_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "chats" */
export type Chats = {
  __typename?: 'chats';
  /** An array relationship */
  chat_participants: Array<Chat_Participants>;
  /** An aggregate relationship */
  chat_participants_aggregate: Chat_Participants_Aggregate;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** An array relationship */
  messages: Array<Messages>;
  /** An aggregate relationship */
  messages_aggregate: Messages_Aggregate;
  name?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  teacher?: Maybe<Teachers>;
  type: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};


/** columns and relationships of "chats" */
export type ChatsChat_ParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Participants_Order_By>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


/** columns and relationships of "chats" */
export type ChatsChat_Participants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Participants_Order_By>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


/** columns and relationships of "chats" */
export type ChatsMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


/** columns and relationships of "chats" */
export type ChatsMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};

/** aggregated selection of "chats" */
export type Chats_Aggregate = {
  __typename?: 'chats_aggregate';
  aggregate?: Maybe<Chats_Aggregate_Fields>;
  nodes: Array<Chats>;
};

export type Chats_Aggregate_Bool_Exp = {
  count?: InputMaybe<Chats_Aggregate_Bool_Exp_Count>;
};

export type Chats_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Chats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Chats_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "chats" */
export type Chats_Aggregate_Fields = {
  __typename?: 'chats_aggregate_fields';
  avg?: Maybe<Chats_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Chats_Max_Fields>;
  min?: Maybe<Chats_Min_Fields>;
  stddev?: Maybe<Chats_Stddev_Fields>;
  stddev_pop?: Maybe<Chats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Chats_Stddev_Samp_Fields>;
  sum?: Maybe<Chats_Sum_Fields>;
  var_pop?: Maybe<Chats_Var_Pop_Fields>;
  var_samp?: Maybe<Chats_Var_Samp_Fields>;
  variance?: Maybe<Chats_Variance_Fields>;
};


/** aggregate fields of "chats" */
export type Chats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "chats" */
export type Chats_Aggregate_Order_By = {
  avg?: InputMaybe<Chats_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chats_Max_Order_By>;
  min?: InputMaybe<Chats_Min_Order_By>;
  stddev?: InputMaybe<Chats_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Chats_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Chats_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Chats_Sum_Order_By>;
  var_pop?: InputMaybe<Chats_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Chats_Var_Samp_Order_By>;
  variance?: InputMaybe<Chats_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "chats" */
export type Chats_Arr_Rel_Insert_Input = {
  data: Array<Chats_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Chats_On_Conflict>;
};

/** aggregate avg on columns */
export type Chats_Avg_Fields = {
  __typename?: 'chats_avg_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "chats" */
export type Chats_Avg_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "chats". All fields are combined with a logical 'AND'. */
export type Chats_Bool_Exp = {
  _and?: InputMaybe<Array<Chats_Bool_Exp>>;
  _not?: InputMaybe<Chats_Bool_Exp>;
  _or?: InputMaybe<Array<Chats_Bool_Exp>>;
  chat_participants?: InputMaybe<Chat_Participants_Bool_Exp>;
  chat_participants_aggregate?: InputMaybe<Chat_Participants_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  messages?: InputMaybe<Messages_Bool_Exp>;
  messages_aggregate?: InputMaybe<Messages_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  teacher?: InputMaybe<Teachers_Bool_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "chats" */
export type Chats_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'chats_pkey';

/** input type for incrementing numeric columns in table "chats" */
export type Chats_Inc_Input = {
  created_by?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "chats" */
export type Chats_Insert_Input = {
  chat_participants?: InputMaybe<Chat_Participants_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  messages?: InputMaybe<Messages_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  teacher?: InputMaybe<Teachers_Obj_Rel_Insert_Input>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Chats_Max_Fields = {
  __typename?: 'chats_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "chats" */
export type Chats_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Chats_Min_Fields = {
  __typename?: 'chats_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  created_by?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "chats" */
export type Chats_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "chats" */
export type Chats_Mutation_Response = {
  __typename?: 'chats_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Chats>;
};

/** input type for inserting object relation for remote table "chats" */
export type Chats_Obj_Rel_Insert_Input = {
  data: Chats_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Chats_On_Conflict>;
};

/** on_conflict condition type for table "chats" */
export type Chats_On_Conflict = {
  constraint: Chats_Constraint;
  update_columns?: Array<Chats_Update_Column>;
  where?: InputMaybe<Chats_Bool_Exp>;
};

/** Ordering options when selecting data from "chats". */
export type Chats_Order_By = {
  chat_participants_aggregate?: InputMaybe<Chat_Participants_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  messages_aggregate?: InputMaybe<Messages_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  teacher?: InputMaybe<Teachers_Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: chats */
export type Chats_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "chats" */
export type Chats_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

/** input type for updating data in table "chats" */
export type Chats_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Chats_Stddev_Fields = {
  __typename?: 'chats_stddev_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "chats" */
export type Chats_Stddev_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Chats_Stddev_Pop_Fields = {
  __typename?: 'chats_stddev_pop_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "chats" */
export type Chats_Stddev_Pop_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Chats_Stddev_Samp_Fields = {
  __typename?: 'chats_stddev_samp_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "chats" */
export type Chats_Stddev_Samp_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "chats" */
export type Chats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chats_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chats_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Chats_Sum_Fields = {
  __typename?: 'chats_sum_fields';
  created_by?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "chats" */
export type Chats_Sum_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "chats" */
export type Chats_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'created_by'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'type'
  /** column name */
  | 'updated_at';

export type Chats_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Chats_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chats_Set_Input>;
  /** filter the rows which have to be updated */
  where: Chats_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Chats_Var_Pop_Fields = {
  __typename?: 'chats_var_pop_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "chats" */
export type Chats_Var_Pop_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Chats_Var_Samp_Fields = {
  __typename?: 'chats_var_samp_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "chats" */
export type Chats_Var_Samp_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Chats_Variance_Fields = {
  __typename?: 'chats_variance_fields';
  created_by?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "chats" */
export type Chats_Variance_Order_By = {
  created_by?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "class_sections" */
export type Class_Sections = {
  __typename?: 'class_sections';
  class_name: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamp']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  section_name: Scalars['String']['output'];
  /** An array relationship */
  students: Array<Students>;
  /** An aggregate relationship */
  students_aggregate: Students_Aggregate;
};


/** columns and relationships of "class_sections" */
export type Class_SectionsStudentsArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


/** columns and relationships of "class_sections" */
export type Class_SectionsStudents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};

/** aggregated selection of "class_sections" */
export type Class_Sections_Aggregate = {
  __typename?: 'class_sections_aggregate';
  aggregate?: Maybe<Class_Sections_Aggregate_Fields>;
  nodes: Array<Class_Sections>;
};

/** aggregate fields of "class_sections" */
export type Class_Sections_Aggregate_Fields = {
  __typename?: 'class_sections_aggregate_fields';
  avg?: Maybe<Class_Sections_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Class_Sections_Max_Fields>;
  min?: Maybe<Class_Sections_Min_Fields>;
  stddev?: Maybe<Class_Sections_Stddev_Fields>;
  stddev_pop?: Maybe<Class_Sections_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Class_Sections_Stddev_Samp_Fields>;
  sum?: Maybe<Class_Sections_Sum_Fields>;
  var_pop?: Maybe<Class_Sections_Var_Pop_Fields>;
  var_samp?: Maybe<Class_Sections_Var_Samp_Fields>;
  variance?: Maybe<Class_Sections_Variance_Fields>;
};


/** aggregate fields of "class_sections" */
export type Class_Sections_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Class_Sections_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Class_Sections_Avg_Fields = {
  __typename?: 'class_sections_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "class_sections". All fields are combined with a logical 'AND'. */
export type Class_Sections_Bool_Exp = {
  _and?: InputMaybe<Array<Class_Sections_Bool_Exp>>;
  _not?: InputMaybe<Class_Sections_Bool_Exp>;
  _or?: InputMaybe<Array<Class_Sections_Bool_Exp>>;
  class_name?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  section_name?: InputMaybe<String_Comparison_Exp>;
  students?: InputMaybe<Students_Bool_Exp>;
  students_aggregate?: InputMaybe<Students_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "class_sections" */
export type Class_Sections_Constraint =
  /** unique or primary key constraint on columns "section_name", "class_name" */
  | 'class_sections_class_name_section_name_key'
  /** unique or primary key constraint on columns "id" */
  | 'class_sections_pkey';

/** input type for incrementing numeric columns in table "class_sections" */
export type Class_Sections_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "class_sections" */
export type Class_Sections_Insert_Input = {
  class_name?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by_admin_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  section_name?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<Students_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Class_Sections_Max_Fields = {
  __typename?: 'class_sections_max_fields';
  class_name?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  section_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Class_Sections_Min_Fields = {
  __typename?: 'class_sections_min_fields';
  class_name?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  section_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "class_sections" */
export type Class_Sections_Mutation_Response = {
  __typename?: 'class_sections_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Class_Sections>;
};

/** input type for inserting object relation for remote table "class_sections" */
export type Class_Sections_Obj_Rel_Insert_Input = {
  data: Class_Sections_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Class_Sections_On_Conflict>;
};

/** on_conflict condition type for table "class_sections" */
export type Class_Sections_On_Conflict = {
  constraint: Class_Sections_Constraint;
  update_columns?: Array<Class_Sections_Update_Column>;
  where?: InputMaybe<Class_Sections_Bool_Exp>;
};

/** Ordering options when selecting data from "class_sections". */
export type Class_Sections_Order_By = {
  class_name?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  section_name?: InputMaybe<Order_By>;
  students_aggregate?: InputMaybe<Students_Aggregate_Order_By>;
};

/** primary key columns input for table: class_sections */
export type Class_Sections_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "class_sections" */
export type Class_Sections_Select_Column =
  /** column name */
  | 'class_name'
  /** column name */
  | 'created_at'
  /** column name */
  | 'display_name'
  /** column name */
  | 'id'
  /** column name */
  | 'section_name';

/** input type for updating data in table "class_sections" */
export type Class_Sections_Set_Input = {
  class_name?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  section_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Class_Sections_Stddev_Fields = {
  __typename?: 'class_sections_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Class_Sections_Stddev_Pop_Fields = {
  __typename?: 'class_sections_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Class_Sections_Stddev_Samp_Fields = {
  __typename?: 'class_sections_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "class_sections" */
export type Class_Sections_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Class_Sections_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Class_Sections_Stream_Cursor_Value_Input = {
  class_name?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  section_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Class_Sections_Sum_Fields = {
  __typename?: 'class_sections_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "class_sections" */
export type Class_Sections_Update_Column =
  /** column name */
  | 'class_name'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'section_name';

export type Class_Sections_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Class_Sections_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Class_Sections_Set_Input>;
  /** filter the rows which have to be updated */
  where: Class_Sections_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Class_Sections_Var_Pop_Fields = {
  __typename?: 'class_sections_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Class_Sections_Var_Samp_Fields = {
  __typename?: 'class_sections_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Class_Sections_Variance_Fields = {
  __typename?: 'class_sections_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** columns and relationships of "emails" */
export type Emails = {
  __typename?: 'emails';
  /** An object relationship */
  exam?: Maybe<Exams>;
  exam_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** An object relationship */
  parent?: Maybe<Parents>;
  parent_id?: Maybe<Scalars['Int']['output']>;
  sent_at?: Maybe<Scalars['timestamp']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  student?: Maybe<Students>;
  student_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "emails" */
export type Emails_Aggregate = {
  __typename?: 'emails_aggregate';
  aggregate?: Maybe<Emails_Aggregate_Fields>;
  nodes: Array<Emails>;
};

export type Emails_Aggregate_Bool_Exp = {
  count?: InputMaybe<Emails_Aggregate_Bool_Exp_Count>;
};

export type Emails_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Emails_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Emails_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "emails" */
export type Emails_Aggregate_Fields = {
  __typename?: 'emails_aggregate_fields';
  avg?: Maybe<Emails_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Emails_Max_Fields>;
  min?: Maybe<Emails_Min_Fields>;
  stddev?: Maybe<Emails_Stddev_Fields>;
  stddev_pop?: Maybe<Emails_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Emails_Stddev_Samp_Fields>;
  sum?: Maybe<Emails_Sum_Fields>;
  var_pop?: Maybe<Emails_Var_Pop_Fields>;
  var_samp?: Maybe<Emails_Var_Samp_Fields>;
  variance?: Maybe<Emails_Variance_Fields>;
};


/** aggregate fields of "emails" */
export type Emails_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Emails_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "emails" */
export type Emails_Aggregate_Order_By = {
  avg?: InputMaybe<Emails_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Emails_Max_Order_By>;
  min?: InputMaybe<Emails_Min_Order_By>;
  stddev?: InputMaybe<Emails_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Emails_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Emails_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Emails_Sum_Order_By>;
  var_pop?: InputMaybe<Emails_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Emails_Var_Samp_Order_By>;
  variance?: InputMaybe<Emails_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "emails" */
export type Emails_Arr_Rel_Insert_Input = {
  data: Array<Emails_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Emails_On_Conflict>;
};

/** aggregate avg on columns */
export type Emails_Avg_Fields = {
  __typename?: 'emails_avg_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "emails" */
export type Emails_Avg_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "emails". All fields are combined with a logical 'AND'. */
export type Emails_Bool_Exp = {
  _and?: InputMaybe<Array<Emails_Bool_Exp>>;
  _not?: InputMaybe<Emails_Bool_Exp>;
  _or?: InputMaybe<Array<Emails_Bool_Exp>>;
  exam?: InputMaybe<Exams_Bool_Exp>;
  exam_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  parent?: InputMaybe<Parents_Bool_Exp>;
  parent_id?: InputMaybe<Int_Comparison_Exp>;
  sent_at?: InputMaybe<Timestamp_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  student?: InputMaybe<Students_Bool_Exp>;
  student_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "emails" */
export type Emails_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'emails_pkey';

/** input type for incrementing numeric columns in table "emails" */
export type Emails_Inc_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "emails" */
export type Emails_Insert_Input = {
  exam?: InputMaybe<Exams_Obj_Rel_Insert_Input>;
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Parents_Obj_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  sent_at?: InputMaybe<Scalars['timestamp']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<Students_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Emails_Max_Fields = {
  __typename?: 'emails_max_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
  sent_at?: Maybe<Scalars['timestamp']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "emails" */
export type Emails_Max_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  sent_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Emails_Min_Fields = {
  __typename?: 'emails_min_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
  sent_at?: Maybe<Scalars['timestamp']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "emails" */
export type Emails_Min_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  sent_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "emails" */
export type Emails_Mutation_Response = {
  __typename?: 'emails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Emails>;
};

/** on_conflict condition type for table "emails" */
export type Emails_On_Conflict = {
  constraint: Emails_Constraint;
  update_columns?: Array<Emails_Update_Column>;
  where?: InputMaybe<Emails_Bool_Exp>;
};

/** Ordering options when selecting data from "emails". */
export type Emails_Order_By = {
  exam?: InputMaybe<Exams_Order_By>;
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent?: InputMaybe<Parents_Order_By>;
  parent_id?: InputMaybe<Order_By>;
  sent_at?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  student?: InputMaybe<Students_Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: emails */
export type Emails_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "emails" */
export type Emails_Select_Column =
  /** column name */
  | 'exam_id'
  /** column name */
  | 'id'
  /** column name */
  | 'parent_id'
  /** column name */
  | 'sent_at'
  /** column name */
  | 'status'
  /** column name */
  | 'student_id';

/** input type for updating data in table "emails" */
export type Emails_Set_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  sent_at?: InputMaybe<Scalars['timestamp']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Emails_Stddev_Fields = {
  __typename?: 'emails_stddev_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "emails" */
export type Emails_Stddev_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Emails_Stddev_Pop_Fields = {
  __typename?: 'emails_stddev_pop_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "emails" */
export type Emails_Stddev_Pop_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Emails_Stddev_Samp_Fields = {
  __typename?: 'emails_stddev_samp_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "emails" */
export type Emails_Stddev_Samp_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "emails" */
export type Emails_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Emails_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Emails_Stream_Cursor_Value_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  sent_at?: InputMaybe<Scalars['timestamp']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Emails_Sum_Fields = {
  __typename?: 'emails_sum_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "emails" */
export type Emails_Sum_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** update columns of table "emails" */
export type Emails_Update_Column =
  /** column name */
  | 'exam_id'
  /** column name */
  | 'id'
  /** column name */
  | 'parent_id'
  /** column name */
  | 'sent_at'
  /** column name */
  | 'status'
  /** column name */
  | 'student_id';

export type Emails_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Emails_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Emails_Set_Input>;
  /** filter the rows which have to be updated */
  where: Emails_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Emails_Var_Pop_Fields = {
  __typename?: 'emails_var_pop_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "emails" */
export type Emails_Var_Pop_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Emails_Var_Samp_Fields = {
  __typename?: 'emails_var_samp_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "emails" */
export type Emails_Var_Samp_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Emails_Variance_Fields = {
  __typename?: 'emails_variance_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "emails" */
export type Emails_Variance_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "exams" */
export type Exams = {
  __typename?: 'exams';
  academic_year: Scalars['String']['output'];
  /** An array relationship */
  emails: Array<Emails>;
  /** An aggregate relationship */
  emails_aggregate: Emails_Aggregate;
  end_date?: Maybe<Scalars['date']['output']>;
  id: Scalars['Int']['output'];
  /** An array relationship */
  marks: Array<Marks>;
  /** An aggregate relationship */
  marks_aggregate: Marks_Aggregate;
  name: Scalars['String']['output'];
  /** An array relationship */
  progress_cards: Array<Progress_Cards>;
  /** An aggregate relationship */
  progress_cards_aggregate: Progress_Cards_Aggregate;
  start_date?: Maybe<Scalars['date']['output']>;
};


/** columns and relationships of "exams" */
export type ExamsEmailsArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


/** columns and relationships of "exams" */
export type ExamsEmails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


/** columns and relationships of "exams" */
export type ExamsMarksArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "exams" */
export type ExamsMarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "exams" */
export type ExamsProgress_CardsArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


/** columns and relationships of "exams" */
export type ExamsProgress_Cards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};

/** aggregated selection of "exams" */
export type Exams_Aggregate = {
  __typename?: 'exams_aggregate';
  aggregate?: Maybe<Exams_Aggregate_Fields>;
  nodes: Array<Exams>;
};

/** aggregate fields of "exams" */
export type Exams_Aggregate_Fields = {
  __typename?: 'exams_aggregate_fields';
  avg?: Maybe<Exams_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Exams_Max_Fields>;
  min?: Maybe<Exams_Min_Fields>;
  stddev?: Maybe<Exams_Stddev_Fields>;
  stddev_pop?: Maybe<Exams_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Exams_Stddev_Samp_Fields>;
  sum?: Maybe<Exams_Sum_Fields>;
  var_pop?: Maybe<Exams_Var_Pop_Fields>;
  var_samp?: Maybe<Exams_Var_Samp_Fields>;
  variance?: Maybe<Exams_Variance_Fields>;
};


/** aggregate fields of "exams" */
export type Exams_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Exams_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Exams_Avg_Fields = {
  __typename?: 'exams_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "exams". All fields are combined with a logical 'AND'. */
export type Exams_Bool_Exp = {
  _and?: InputMaybe<Array<Exams_Bool_Exp>>;
  _not?: InputMaybe<Exams_Bool_Exp>;
  _or?: InputMaybe<Array<Exams_Bool_Exp>>;
  academic_year?: InputMaybe<String_Comparison_Exp>;
  emails?: InputMaybe<Emails_Bool_Exp>;
  emails_aggregate?: InputMaybe<Emails_Aggregate_Bool_Exp>;
  end_date?: InputMaybe<Date_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  marks?: InputMaybe<Marks_Bool_Exp>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  progress_cards?: InputMaybe<Progress_Cards_Bool_Exp>;
  progress_cards_aggregate?: InputMaybe<Progress_Cards_Aggregate_Bool_Exp>;
  start_date?: InputMaybe<Date_Comparison_Exp>;
};

/** unique or primary key constraints on table "exams" */
export type Exams_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'exams_pkey';

/** input type for incrementing numeric columns in table "exams" */
export type Exams_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "exams" */
export type Exams_Insert_Input = {
  academic_year?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Emails_Arr_Rel_Insert_Input>;
  end_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  marks?: InputMaybe<Marks_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  progress_cards?: InputMaybe<Progress_Cards_Arr_Rel_Insert_Input>;
  start_date?: InputMaybe<Scalars['date']['input']>;
};

/** aggregate max on columns */
export type Exams_Max_Fields = {
  __typename?: 'exams_max_fields';
  academic_year?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['date']['output']>;
};

/** aggregate min on columns */
export type Exams_Min_Fields = {
  __typename?: 'exams_min_fields';
  academic_year?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['date']['output']>;
};

/** response of any mutation on the table "exams" */
export type Exams_Mutation_Response = {
  __typename?: 'exams_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Exams>;
};

/** input type for inserting object relation for remote table "exams" */
export type Exams_Obj_Rel_Insert_Input = {
  data: Exams_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Exams_On_Conflict>;
};

/** on_conflict condition type for table "exams" */
export type Exams_On_Conflict = {
  constraint: Exams_Constraint;
  update_columns?: Array<Exams_Update_Column>;
  where?: InputMaybe<Exams_Bool_Exp>;
};

/** Ordering options when selecting data from "exams". */
export type Exams_Order_By = {
  academic_year?: InputMaybe<Order_By>;
  emails_aggregate?: InputMaybe<Emails_Aggregate_Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  progress_cards_aggregate?: InputMaybe<Progress_Cards_Aggregate_Order_By>;
  start_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: exams */
export type Exams_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "exams" */
export type Exams_Select_Column =
  /** column name */
  | 'academic_year'
  /** column name */
  | 'end_date'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'start_date';

/** input type for updating data in table "exams" */
export type Exams_Set_Input = {
  academic_year?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['date']['input']>;
};

/** aggregate stddev on columns */
export type Exams_Stddev_Fields = {
  __typename?: 'exams_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Exams_Stddev_Pop_Fields = {
  __typename?: 'exams_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Exams_Stddev_Samp_Fields = {
  __typename?: 'exams_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "exams" */
export type Exams_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Exams_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Exams_Stream_Cursor_Value_Input = {
  academic_year?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['date']['input']>;
};

/** aggregate sum on columns */
export type Exams_Sum_Fields = {
  __typename?: 'exams_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "exams" */
export type Exams_Update_Column =
  /** column name */
  | 'academic_year'
  /** column name */
  | 'end_date'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'start_date';

export type Exams_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Exams_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Exams_Set_Input>;
  /** filter the rows which have to be updated */
  where: Exams_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Exams_Var_Pop_Fields = {
  __typename?: 'exams_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Exams_Var_Samp_Fields = {
  __typename?: 'exams_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Exams_Variance_Fields = {
  __typename?: 'exams_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "marks" */
export type Marks = {
  __typename?: 'marks';
  entered_at?: Maybe<Scalars['timestamp']['output']>;
  /** An object relationship */
  exam?: Maybe<Exams>;
  exam_id?: Maybe<Scalars['Int']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_finalized?: Maybe<Scalars['Boolean']['output']>;
  marks_obtained?: Maybe<Scalars['numeric']['output']>;
  max_marks?: Maybe<Scalars['numeric']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  student?: Maybe<Students>;
  student_id?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  subject?: Maybe<Subjects>;
  subject_id?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  teacher?: Maybe<Teachers>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "marks" */
export type Marks_Aggregate = {
  __typename?: 'marks_aggregate';
  aggregate?: Maybe<Marks_Aggregate_Fields>;
  nodes: Array<Marks>;
};

export type Marks_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Marks_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Marks_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Marks_Aggregate_Bool_Exp_Count>;
};

export type Marks_Aggregate_Bool_Exp_Bool_And = {
  arguments: Marks_Select_Column_Marks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Marks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Marks_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Marks_Select_Column_Marks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Marks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Marks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Marks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Marks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "marks" */
export type Marks_Aggregate_Fields = {
  __typename?: 'marks_aggregate_fields';
  avg?: Maybe<Marks_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Marks_Max_Fields>;
  min?: Maybe<Marks_Min_Fields>;
  stddev?: Maybe<Marks_Stddev_Fields>;
  stddev_pop?: Maybe<Marks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Marks_Stddev_Samp_Fields>;
  sum?: Maybe<Marks_Sum_Fields>;
  var_pop?: Maybe<Marks_Var_Pop_Fields>;
  var_samp?: Maybe<Marks_Var_Samp_Fields>;
  variance?: Maybe<Marks_Variance_Fields>;
};


/** aggregate fields of "marks" */
export type Marks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Marks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "marks" */
export type Marks_Aggregate_Order_By = {
  avg?: InputMaybe<Marks_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Marks_Max_Order_By>;
  min?: InputMaybe<Marks_Min_Order_By>;
  stddev?: InputMaybe<Marks_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Marks_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Marks_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Marks_Sum_Order_By>;
  var_pop?: InputMaybe<Marks_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Marks_Var_Samp_Order_By>;
  variance?: InputMaybe<Marks_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "marks" */
export type Marks_Arr_Rel_Insert_Input = {
  data: Array<Marks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Marks_On_Conflict>;
};

/** aggregate avg on columns */
export type Marks_Avg_Fields = {
  __typename?: 'marks_avg_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "marks" */
export type Marks_Avg_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "marks". All fields are combined with a logical 'AND'. */
export type Marks_Bool_Exp = {
  _and?: InputMaybe<Array<Marks_Bool_Exp>>;
  _not?: InputMaybe<Marks_Bool_Exp>;
  _or?: InputMaybe<Array<Marks_Bool_Exp>>;
  entered_at?: InputMaybe<Timestamp_Comparison_Exp>;
  exam?: InputMaybe<Exams_Bool_Exp>;
  exam_id?: InputMaybe<Int_Comparison_Exp>;
  grade?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_finalized?: InputMaybe<Boolean_Comparison_Exp>;
  marks_obtained?: InputMaybe<Numeric_Comparison_Exp>;
  max_marks?: InputMaybe<Numeric_Comparison_Exp>;
  remarks?: InputMaybe<String_Comparison_Exp>;
  student?: InputMaybe<Students_Bool_Exp>;
  student_id?: InputMaybe<Int_Comparison_Exp>;
  subject?: InputMaybe<Subjects_Bool_Exp>;
  subject_id?: InputMaybe<Int_Comparison_Exp>;
  teacher?: InputMaybe<Teachers_Bool_Exp>;
  teacher_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "marks" */
export type Marks_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'marks_pkey';

/** input type for incrementing numeric columns in table "marks" */
export type Marks_Inc_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  marks_obtained?: InputMaybe<Scalars['numeric']['input']>;
  max_marks?: InputMaybe<Scalars['numeric']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  subject_id?: InputMaybe<Scalars['Int']['input']>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "marks" */
export type Marks_Insert_Input = {
  entered_at?: InputMaybe<Scalars['timestamp']['input']>;
  exam?: InputMaybe<Exams_Obj_Rel_Insert_Input>;
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_finalized?: InputMaybe<Scalars['Boolean']['input']>;
  marks_obtained?: InputMaybe<Scalars['numeric']['input']>;
  max_marks?: InputMaybe<Scalars['numeric']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  student?: InputMaybe<Students_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  subject?: InputMaybe<Subjects_Obj_Rel_Insert_Input>;
  subject_id?: InputMaybe<Scalars['Int']['input']>;
  teacher?: InputMaybe<Teachers_Obj_Rel_Insert_Input>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Marks_Max_Fields = {
  __typename?: 'marks_max_fields';
  entered_at?: Maybe<Scalars['timestamp']['output']>;
  exam_id?: Maybe<Scalars['Int']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  marks_obtained?: Maybe<Scalars['numeric']['output']>;
  max_marks?: Maybe<Scalars['numeric']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
  subject_id?: Maybe<Scalars['Int']['output']>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "marks" */
export type Marks_Max_Order_By = {
  entered_at?: InputMaybe<Order_By>;
  exam_id?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Marks_Min_Fields = {
  __typename?: 'marks_min_fields';
  entered_at?: Maybe<Scalars['timestamp']['output']>;
  exam_id?: Maybe<Scalars['Int']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  marks_obtained?: Maybe<Scalars['numeric']['output']>;
  max_marks?: Maybe<Scalars['numeric']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
  subject_id?: Maybe<Scalars['Int']['output']>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "marks" */
export type Marks_Min_Order_By = {
  entered_at?: InputMaybe<Order_By>;
  exam_id?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "marks" */
export type Marks_Mutation_Response = {
  __typename?: 'marks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Marks>;
};

/** on_conflict condition type for table "marks" */
export type Marks_On_Conflict = {
  constraint: Marks_Constraint;
  update_columns?: Array<Marks_Update_Column>;
  where?: InputMaybe<Marks_Bool_Exp>;
};

/** Ordering options when selecting data from "marks". */
export type Marks_Order_By = {
  entered_at?: InputMaybe<Order_By>;
  exam?: InputMaybe<Exams_Order_By>;
  exam_id?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_finalized?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  remarks?: InputMaybe<Order_By>;
  student?: InputMaybe<Students_Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject?: InputMaybe<Subjects_Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher?: InputMaybe<Teachers_Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: marks */
export type Marks_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "marks" */
export type Marks_Select_Column =
  /** column name */
  | 'entered_at'
  /** column name */
  | 'exam_id'
  /** column name */
  | 'grade'
  /** column name */
  | 'id'
  /** column name */
  | 'is_finalized'
  /** column name */
  | 'marks_obtained'
  /** column name */
  | 'max_marks'
  /** column name */
  | 'remarks'
  /** column name */
  | 'student_id'
  /** column name */
  | 'subject_id'
  /** column name */
  | 'teacher_id';

/** select "marks_aggregate_bool_exp_bool_and_arguments_columns" columns of table "marks" */
export type Marks_Select_Column_Marks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_finalized';

/** select "marks_aggregate_bool_exp_bool_or_arguments_columns" columns of table "marks" */
export type Marks_Select_Column_Marks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_finalized';

/** input type for updating data in table "marks" */
export type Marks_Set_Input = {
  entered_at?: InputMaybe<Scalars['timestamp']['input']>;
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_finalized?: InputMaybe<Scalars['Boolean']['input']>;
  marks_obtained?: InputMaybe<Scalars['numeric']['input']>;
  max_marks?: InputMaybe<Scalars['numeric']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  subject_id?: InputMaybe<Scalars['Int']['input']>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Marks_Stddev_Fields = {
  __typename?: 'marks_stddev_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "marks" */
export type Marks_Stddev_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Marks_Stddev_Pop_Fields = {
  __typename?: 'marks_stddev_pop_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "marks" */
export type Marks_Stddev_Pop_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Marks_Stddev_Samp_Fields = {
  __typename?: 'marks_stddev_samp_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "marks" */
export type Marks_Stddev_Samp_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "marks" */
export type Marks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Marks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Marks_Stream_Cursor_Value_Input = {
  entered_at?: InputMaybe<Scalars['timestamp']['input']>;
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_finalized?: InputMaybe<Scalars['Boolean']['input']>;
  marks_obtained?: InputMaybe<Scalars['numeric']['input']>;
  max_marks?: InputMaybe<Scalars['numeric']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  subject_id?: InputMaybe<Scalars['Int']['input']>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Marks_Sum_Fields = {
  __typename?: 'marks_sum_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  marks_obtained?: Maybe<Scalars['numeric']['output']>;
  max_marks?: Maybe<Scalars['numeric']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
  subject_id?: Maybe<Scalars['Int']['output']>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "marks" */
export type Marks_Sum_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** update columns of table "marks" */
export type Marks_Update_Column =
  /** column name */
  | 'entered_at'
  /** column name */
  | 'exam_id'
  /** column name */
  | 'grade'
  /** column name */
  | 'id'
  /** column name */
  | 'is_finalized'
  /** column name */
  | 'marks_obtained'
  /** column name */
  | 'max_marks'
  /** column name */
  | 'remarks'
  /** column name */
  | 'student_id'
  /** column name */
  | 'subject_id'
  /** column name */
  | 'teacher_id';

export type Marks_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Marks_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Marks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Marks_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Marks_Var_Pop_Fields = {
  __typename?: 'marks_var_pop_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "marks" */
export type Marks_Var_Pop_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Marks_Var_Samp_Fields = {
  __typename?: 'marks_var_samp_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "marks" */
export type Marks_Var_Samp_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Marks_Variance_Fields = {
  __typename?: 'marks_variance_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  marks_obtained?: Maybe<Scalars['Float']['output']>;
  max_marks?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  subject_id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "marks" */
export type Marks_Variance_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_obtained?: InputMaybe<Order_By>;
  max_marks?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "messages" */
export type Messages = {
  __typename?: 'messages';
  /** An object relationship */
  chat: Chats;
  chat_id: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['Int']['output'];
  is_read?: Maybe<Scalars['Boolean']['output']>;
  sender_id: Scalars['Int']['output'];
  sender_type: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregated selection of "messages" */
export type Messages_Aggregate = {
  __typename?: 'messages_aggregate';
  aggregate?: Maybe<Messages_Aggregate_Fields>;
  nodes: Array<Messages>;
};

export type Messages_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Messages_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Messages_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Messages_Aggregate_Bool_Exp_Count>;
};

export type Messages_Aggregate_Bool_Exp_Bool_And = {
  arguments: Messages_Select_Column_Messages_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Messages_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Messages_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Messages_Select_Column_Messages_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Messages_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Messages_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Messages_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "messages" */
export type Messages_Aggregate_Fields = {
  __typename?: 'messages_aggregate_fields';
  avg?: Maybe<Messages_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Messages_Max_Fields>;
  min?: Maybe<Messages_Min_Fields>;
  stddev?: Maybe<Messages_Stddev_Fields>;
  stddev_pop?: Maybe<Messages_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Messages_Stddev_Samp_Fields>;
  sum?: Maybe<Messages_Sum_Fields>;
  var_pop?: Maybe<Messages_Var_Pop_Fields>;
  var_samp?: Maybe<Messages_Var_Samp_Fields>;
  variance?: Maybe<Messages_Variance_Fields>;
};


/** aggregate fields of "messages" */
export type Messages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "messages" */
export type Messages_Aggregate_Order_By = {
  avg?: InputMaybe<Messages_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Messages_Max_Order_By>;
  min?: InputMaybe<Messages_Min_Order_By>;
  stddev?: InputMaybe<Messages_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Messages_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Messages_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Messages_Sum_Order_By>;
  var_pop?: InputMaybe<Messages_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Messages_Var_Samp_Order_By>;
  variance?: InputMaybe<Messages_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "messages" */
export type Messages_Arr_Rel_Insert_Input = {
  data: Array<Messages_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};

/** aggregate avg on columns */
export type Messages_Avg_Fields = {
  __typename?: 'messages_avg_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "messages" */
export type Messages_Avg_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "messages". All fields are combined with a logical 'AND'. */
export type Messages_Bool_Exp = {
  _and?: InputMaybe<Array<Messages_Bool_Exp>>;
  _not?: InputMaybe<Messages_Bool_Exp>;
  _or?: InputMaybe<Array<Messages_Bool_Exp>>;
  chat?: InputMaybe<Chats_Bool_Exp>;
  chat_id?: InputMaybe<Int_Comparison_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_read?: InputMaybe<Boolean_Comparison_Exp>;
  sender_id?: InputMaybe<Int_Comparison_Exp>;
  sender_type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "messages" */
export type Messages_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'messages_pkey';

/** input type for incrementing numeric columns in table "messages" */
export type Messages_Inc_Input = {
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  sender_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "messages" */
export type Messages_Insert_Input = {
  chat?: InputMaybe<Chats_Obj_Rel_Insert_Input>;
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  sender_id?: InputMaybe<Scalars['Int']['input']>;
  sender_type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Messages_Max_Fields = {
  __typename?: 'messages_max_fields';
  chat_id?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  sender_id?: Maybe<Scalars['Int']['output']>;
  sender_type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "messages" */
export type Messages_Max_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  sender_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Messages_Min_Fields = {
  __typename?: 'messages_min_fields';
  chat_id?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  sender_id?: Maybe<Scalars['Int']['output']>;
  sender_type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "messages" */
export type Messages_Min_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  sender_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "messages" */
export type Messages_Mutation_Response = {
  __typename?: 'messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Messages>;
};

/** on_conflict condition type for table "messages" */
export type Messages_On_Conflict = {
  constraint: Messages_Constraint;
  update_columns?: Array<Messages_Update_Column>;
  where?: InputMaybe<Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "messages". */
export type Messages_Order_By = {
  chat?: InputMaybe<Chats_Order_By>;
  chat_id?: InputMaybe<Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_read?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  sender_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: messages */
export type Messages_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "messages" */
export type Messages_Select_Column =
  /** column name */
  | 'chat_id'
  /** column name */
  | 'content'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'is_read'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'sender_type'
  /** column name */
  | 'updated_at';

/** select "messages_aggregate_bool_exp_bool_and_arguments_columns" columns of table "messages" */
export type Messages_Select_Column_Messages_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_read';

/** select "messages_aggregate_bool_exp_bool_or_arguments_columns" columns of table "messages" */
export type Messages_Select_Column_Messages_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_read';

/** input type for updating data in table "messages" */
export type Messages_Set_Input = {
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  sender_id?: InputMaybe<Scalars['Int']['input']>;
  sender_type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Messages_Stddev_Fields = {
  __typename?: 'messages_stddev_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "messages" */
export type Messages_Stddev_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Messages_Stddev_Pop_Fields = {
  __typename?: 'messages_stddev_pop_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "messages" */
export type Messages_Stddev_Pop_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Messages_Stddev_Samp_Fields = {
  __typename?: 'messages_stddev_samp_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "messages" */
export type Messages_Stddev_Samp_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "messages" */
export type Messages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Messages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Messages_Stream_Cursor_Value_Input = {
  chat_id?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  sender_id?: InputMaybe<Scalars['Int']['input']>;
  sender_type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Messages_Sum_Fields = {
  __typename?: 'messages_sum_fields';
  chat_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  sender_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "messages" */
export type Messages_Sum_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** update columns of table "messages" */
export type Messages_Update_Column =
  /** column name */
  | 'chat_id'
  /** column name */
  | 'content'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'is_read'
  /** column name */
  | 'sender_id'
  /** column name */
  | 'sender_type'
  /** column name */
  | 'updated_at';

export type Messages_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Messages_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Messages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Messages_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Messages_Var_Pop_Fields = {
  __typename?: 'messages_var_pop_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "messages" */
export type Messages_Var_Pop_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Messages_Var_Samp_Fields = {
  __typename?: 'messages_var_samp_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "messages" */
export type Messages_Var_Samp_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Messages_Variance_Fields = {
  __typename?: 'messages_variance_fields';
  chat_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  sender_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "messages" */
export type Messages_Variance_Order_By = {
  chat_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "admins" */
  delete_admins?: Maybe<Admins_Mutation_Response>;
  /** delete single row from the table: "admins" */
  delete_admins_by_pk?: Maybe<Admins>;
  /** delete data from the table: "chat_participants" */
  delete_chat_participants?: Maybe<Chat_Participants_Mutation_Response>;
  /** delete single row from the table: "chat_participants" */
  delete_chat_participants_by_pk?: Maybe<Chat_Participants>;
  /** delete data from the table: "chats" */
  delete_chats?: Maybe<Chats_Mutation_Response>;
  /** delete single row from the table: "chats" */
  delete_chats_by_pk?: Maybe<Chats>;
  /** delete data from the table: "class_sections" */
  delete_class_sections?: Maybe<Class_Sections_Mutation_Response>;
  /** delete single row from the table: "class_sections" */
  delete_class_sections_by_pk?: Maybe<Class_Sections>;
  /** delete data from the table: "emails" */
  delete_emails?: Maybe<Emails_Mutation_Response>;
  /** delete single row from the table: "emails" */
  delete_emails_by_pk?: Maybe<Emails>;
  /** delete data from the table: "exams" */
  delete_exams?: Maybe<Exams_Mutation_Response>;
  /** delete single row from the table: "exams" */
  delete_exams_by_pk?: Maybe<Exams>;
  /** delete data from the table: "marks" */
  delete_marks?: Maybe<Marks_Mutation_Response>;
  /** delete single row from the table: "marks" */
  delete_marks_by_pk?: Maybe<Marks>;
  /** delete data from the table: "messages" */
  delete_messages?: Maybe<Messages_Mutation_Response>;
  /** delete single row from the table: "messages" */
  delete_messages_by_pk?: Maybe<Messages>;
  /** delete data from the table: "parents" */
  delete_parents?: Maybe<Parents_Mutation_Response>;
  /** delete single row from the table: "parents" */
  delete_parents_by_pk?: Maybe<Parents>;
  /** delete data from the table: "progress_cards" */
  delete_progress_cards?: Maybe<Progress_Cards_Mutation_Response>;
  /** delete single row from the table: "progress_cards" */
  delete_progress_cards_by_pk?: Maybe<Progress_Cards>;
  /** delete data from the table: "students" */
  delete_students?: Maybe<Students_Mutation_Response>;
  /** delete single row from the table: "students" */
  delete_students_by_pk?: Maybe<Students>;
  /** delete data from the table: "subjects" */
  delete_subjects?: Maybe<Subjects_Mutation_Response>;
  /** delete single row from the table: "subjects" */
  delete_subjects_by_pk?: Maybe<Subjects>;
  /** delete data from the table: "teachers" */
  delete_teachers?: Maybe<Teachers_Mutation_Response>;
  /** delete single row from the table: "teachers" */
  delete_teachers_by_pk?: Maybe<Teachers>;
  /** delete data from the table: "uploads" */
  delete_uploads?: Maybe<Uploads_Mutation_Response>;
  /** delete single row from the table: "uploads" */
  delete_uploads_by_pk?: Maybe<Uploads>;
  /** insert data into the table: "admins" */
  insert_admins?: Maybe<Admins_Mutation_Response>;
  /** insert a single row into the table: "admins" */
  insert_admins_one?: Maybe<Admins>;
  /** insert data into the table: "chat_participants" */
  insert_chat_participants?: Maybe<Chat_Participants_Mutation_Response>;
  /** insert a single row into the table: "chat_participants" */
  insert_chat_participants_one?: Maybe<Chat_Participants>;
  /** insert data into the table: "chats" */
  insert_chats?: Maybe<Chats_Mutation_Response>;
  /** insert a single row into the table: "chats" */
  insert_chats_one?: Maybe<Chats>;
  /** insert data into the table: "class_sections" */
  insert_class_sections?: Maybe<Class_Sections_Mutation_Response>;
  /** insert a single row into the table: "class_sections" */
  insert_class_sections_one?: Maybe<Class_Sections>;
  /** insert data into the table: "emails" */
  insert_emails?: Maybe<Emails_Mutation_Response>;
  /** insert a single row into the table: "emails" */
  insert_emails_one?: Maybe<Emails>;
  /** insert data into the table: "exams" */
  insert_exams?: Maybe<Exams_Mutation_Response>;
  /** insert a single row into the table: "exams" */
  insert_exams_one?: Maybe<Exams>;
  /** insert data into the table: "marks" */
  insert_marks?: Maybe<Marks_Mutation_Response>;
  /** insert a single row into the table: "marks" */
  insert_marks_one?: Maybe<Marks>;
  /** insert data into the table: "messages" */
  insert_messages?: Maybe<Messages_Mutation_Response>;
  /** insert a single row into the table: "messages" */
  insert_messages_one?: Maybe<Messages>;
  /** insert data into the table: "parents" */
  insert_parents?: Maybe<Parents_Mutation_Response>;
  /** insert a single row into the table: "parents" */
  insert_parents_one?: Maybe<Parents>;
  /** insert data into the table: "progress_cards" */
  insert_progress_cards?: Maybe<Progress_Cards_Mutation_Response>;
  /** insert a single row into the table: "progress_cards" */
  insert_progress_cards_one?: Maybe<Progress_Cards>;
  /** insert data into the table: "students" */
  insert_students?: Maybe<Students_Mutation_Response>;
  /** insert a single row into the table: "students" */
  insert_students_one?: Maybe<Students>;
  /** insert data into the table: "subjects" */
  insert_subjects?: Maybe<Subjects_Mutation_Response>;
  /** insert a single row into the table: "subjects" */
  insert_subjects_one?: Maybe<Subjects>;
  /** insert data into the table: "teachers" */
  insert_teachers?: Maybe<Teachers_Mutation_Response>;
  /** insert a single row into the table: "teachers" */
  insert_teachers_one?: Maybe<Teachers>;
  /** insert data into the table: "uploads" */
  insert_uploads?: Maybe<Uploads_Mutation_Response>;
  /** insert a single row into the table: "uploads" */
  insert_uploads_one?: Maybe<Uploads>;
  /** update data of the table: "admins" */
  update_admins?: Maybe<Admins_Mutation_Response>;
  /** update single row of the table: "admins" */
  update_admins_by_pk?: Maybe<Admins>;
  /** update multiples rows of table: "admins" */
  update_admins_many?: Maybe<Array<Maybe<Admins_Mutation_Response>>>;
  /** update data of the table: "chat_participants" */
  update_chat_participants?: Maybe<Chat_Participants_Mutation_Response>;
  /** update single row of the table: "chat_participants" */
  update_chat_participants_by_pk?: Maybe<Chat_Participants>;
  /** update multiples rows of table: "chat_participants" */
  update_chat_participants_many?: Maybe<Array<Maybe<Chat_Participants_Mutation_Response>>>;
  /** update data of the table: "chats" */
  update_chats?: Maybe<Chats_Mutation_Response>;
  /** update single row of the table: "chats" */
  update_chats_by_pk?: Maybe<Chats>;
  /** update multiples rows of table: "chats" */
  update_chats_many?: Maybe<Array<Maybe<Chats_Mutation_Response>>>;
  /** update data of the table: "class_sections" */
  update_class_sections?: Maybe<Class_Sections_Mutation_Response>;
  /** update single row of the table: "class_sections" */
  update_class_sections_by_pk?: Maybe<Class_Sections>;
  /** update multiples rows of table: "class_sections" */
  update_class_sections_many?: Maybe<Array<Maybe<Class_Sections_Mutation_Response>>>;
  /** update data of the table: "emails" */
  update_emails?: Maybe<Emails_Mutation_Response>;
  /** update single row of the table: "emails" */
  update_emails_by_pk?: Maybe<Emails>;
  /** update multiples rows of table: "emails" */
  update_emails_many?: Maybe<Array<Maybe<Emails_Mutation_Response>>>;
  /** update data of the table: "exams" */
  update_exams?: Maybe<Exams_Mutation_Response>;
  /** update single row of the table: "exams" */
  update_exams_by_pk?: Maybe<Exams>;
  /** update multiples rows of table: "exams" */
  update_exams_many?: Maybe<Array<Maybe<Exams_Mutation_Response>>>;
  /** update data of the table: "marks" */
  update_marks?: Maybe<Marks_Mutation_Response>;
  /** update single row of the table: "marks" */
  update_marks_by_pk?: Maybe<Marks>;
  /** update multiples rows of table: "marks" */
  update_marks_many?: Maybe<Array<Maybe<Marks_Mutation_Response>>>;
  /** update data of the table: "messages" */
  update_messages?: Maybe<Messages_Mutation_Response>;
  /** update single row of the table: "messages" */
  update_messages_by_pk?: Maybe<Messages>;
  /** update multiples rows of table: "messages" */
  update_messages_many?: Maybe<Array<Maybe<Messages_Mutation_Response>>>;
  /** update data of the table: "parents" */
  update_parents?: Maybe<Parents_Mutation_Response>;
  /** update single row of the table: "parents" */
  update_parents_by_pk?: Maybe<Parents>;
  /** update multiples rows of table: "parents" */
  update_parents_many?: Maybe<Array<Maybe<Parents_Mutation_Response>>>;
  /** update data of the table: "progress_cards" */
  update_progress_cards?: Maybe<Progress_Cards_Mutation_Response>;
  /** update single row of the table: "progress_cards" */
  update_progress_cards_by_pk?: Maybe<Progress_Cards>;
  /** update multiples rows of table: "progress_cards" */
  update_progress_cards_many?: Maybe<Array<Maybe<Progress_Cards_Mutation_Response>>>;
  /** update data of the table: "students" */
  update_students?: Maybe<Students_Mutation_Response>;
  /** update single row of the table: "students" */
  update_students_by_pk?: Maybe<Students>;
  /** update multiples rows of table: "students" */
  update_students_many?: Maybe<Array<Maybe<Students_Mutation_Response>>>;
  /** update data of the table: "subjects" */
  update_subjects?: Maybe<Subjects_Mutation_Response>;
  /** update single row of the table: "subjects" */
  update_subjects_by_pk?: Maybe<Subjects>;
  /** update multiples rows of table: "subjects" */
  update_subjects_many?: Maybe<Array<Maybe<Subjects_Mutation_Response>>>;
  /** update data of the table: "teachers" */
  update_teachers?: Maybe<Teachers_Mutation_Response>;
  /** update single row of the table: "teachers" */
  update_teachers_by_pk?: Maybe<Teachers>;
  /** update multiples rows of table: "teachers" */
  update_teachers_many?: Maybe<Array<Maybe<Teachers_Mutation_Response>>>;
  /** update data of the table: "uploads" */
  update_uploads?: Maybe<Uploads_Mutation_Response>;
  /** update single row of the table: "uploads" */
  update_uploads_by_pk?: Maybe<Uploads>;
  /** update multiples rows of table: "uploads" */
  update_uploads_many?: Maybe<Array<Maybe<Uploads_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_AdminsArgs = {
  where: Admins_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Admins_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_ParticipantsArgs = {
  where: Chat_Participants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Participants_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ChatsArgs = {
  where: Chats_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chats_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Class_SectionsArgs = {
  where: Class_Sections_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Class_Sections_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_EmailsArgs = {
  where: Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Emails_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ExamsArgs = {
  where: Exams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Exams_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_MarksArgs = {
  where: Marks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Marks_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_MessagesArgs = {
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Messages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ParentsArgs = {
  where: Parents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Parents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Progress_CardsArgs = {
  where: Progress_Cards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Progress_Cards_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_StudentsArgs = {
  where: Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Students_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_SubjectsArgs = {
  where: Subjects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Subjects_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TeachersArgs = {
  where: Teachers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Teachers_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UploadsArgs = {
  where: Uploads_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Uploads_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_AdminsArgs = {
  objects: Array<Admins_Insert_Input>;
  on_conflict?: InputMaybe<Admins_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Admins_OneArgs = {
  object: Admins_Insert_Input;
  on_conflict?: InputMaybe<Admins_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_ParticipantsArgs = {
  objects: Array<Chat_Participants_Insert_Input>;
  on_conflict?: InputMaybe<Chat_Participants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Participants_OneArgs = {
  object: Chat_Participants_Insert_Input;
  on_conflict?: InputMaybe<Chat_Participants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ChatsArgs = {
  objects: Array<Chats_Insert_Input>;
  on_conflict?: InputMaybe<Chats_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chats_OneArgs = {
  object: Chats_Insert_Input;
  on_conflict?: InputMaybe<Chats_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Class_SectionsArgs = {
  objects: Array<Class_Sections_Insert_Input>;
  on_conflict?: InputMaybe<Class_Sections_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Class_Sections_OneArgs = {
  object: Class_Sections_Insert_Input;
  on_conflict?: InputMaybe<Class_Sections_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EmailsArgs = {
  objects: Array<Emails_Insert_Input>;
  on_conflict?: InputMaybe<Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Emails_OneArgs = {
  object: Emails_Insert_Input;
  on_conflict?: InputMaybe<Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExamsArgs = {
  objects: Array<Exams_Insert_Input>;
  on_conflict?: InputMaybe<Exams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Exams_OneArgs = {
  object: Exams_Insert_Input;
  on_conflict?: InputMaybe<Exams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MarksArgs = {
  objects: Array<Marks_Insert_Input>;
  on_conflict?: InputMaybe<Marks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Marks_OneArgs = {
  object: Marks_Insert_Input;
  on_conflict?: InputMaybe<Marks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MessagesArgs = {
  objects: Array<Messages_Insert_Input>;
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_OneArgs = {
  object: Messages_Insert_Input;
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ParentsArgs = {
  objects: Array<Parents_Insert_Input>;
  on_conflict?: InputMaybe<Parents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Parents_OneArgs = {
  object: Parents_Insert_Input;
  on_conflict?: InputMaybe<Parents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Progress_CardsArgs = {
  objects: Array<Progress_Cards_Insert_Input>;
  on_conflict?: InputMaybe<Progress_Cards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Progress_Cards_OneArgs = {
  object: Progress_Cards_Insert_Input;
  on_conflict?: InputMaybe<Progress_Cards_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StudentsArgs = {
  objects: Array<Students_Insert_Input>;
  on_conflict?: InputMaybe<Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Students_OneArgs = {
  object: Students_Insert_Input;
  on_conflict?: InputMaybe<Students_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SubjectsArgs = {
  objects: Array<Subjects_Insert_Input>;
  on_conflict?: InputMaybe<Subjects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Subjects_OneArgs = {
  object: Subjects_Insert_Input;
  on_conflict?: InputMaybe<Subjects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TeachersArgs = {
  objects: Array<Teachers_Insert_Input>;
  on_conflict?: InputMaybe<Teachers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teachers_OneArgs = {
  object: Teachers_Insert_Input;
  on_conflict?: InputMaybe<Teachers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UploadsArgs = {
  objects: Array<Uploads_Insert_Input>;
  on_conflict?: InputMaybe<Uploads_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Uploads_OneArgs = {
  object: Uploads_Insert_Input;
  on_conflict?: InputMaybe<Uploads_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AdminsArgs = {
  _inc?: InputMaybe<Admins_Inc_Input>;
  _set?: InputMaybe<Admins_Set_Input>;
  where: Admins_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Admins_By_PkArgs = {
  _inc?: InputMaybe<Admins_Inc_Input>;
  _set?: InputMaybe<Admins_Set_Input>;
  pk_columns: Admins_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Admins_ManyArgs = {
  updates: Array<Admins_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_ParticipantsArgs = {
  _inc?: InputMaybe<Chat_Participants_Inc_Input>;
  _set?: InputMaybe<Chat_Participants_Set_Input>;
  where: Chat_Participants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Participants_By_PkArgs = {
  _inc?: InputMaybe<Chat_Participants_Inc_Input>;
  _set?: InputMaybe<Chat_Participants_Set_Input>;
  pk_columns: Chat_Participants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Participants_ManyArgs = {
  updates: Array<Chat_Participants_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ChatsArgs = {
  _inc?: InputMaybe<Chats_Inc_Input>;
  _set?: InputMaybe<Chats_Set_Input>;
  where: Chats_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chats_By_PkArgs = {
  _inc?: InputMaybe<Chats_Inc_Input>;
  _set?: InputMaybe<Chats_Set_Input>;
  pk_columns: Chats_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chats_ManyArgs = {
  updates: Array<Chats_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Class_SectionsArgs = {
  _inc?: InputMaybe<Class_Sections_Inc_Input>;
  _set?: InputMaybe<Class_Sections_Set_Input>;
  where: Class_Sections_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Class_Sections_By_PkArgs = {
  _inc?: InputMaybe<Class_Sections_Inc_Input>;
  _set?: InputMaybe<Class_Sections_Set_Input>;
  pk_columns: Class_Sections_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Class_Sections_ManyArgs = {
  updates: Array<Class_Sections_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EmailsArgs = {
  _inc?: InputMaybe<Emails_Inc_Input>;
  _set?: InputMaybe<Emails_Set_Input>;
  where: Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Emails_By_PkArgs = {
  _inc?: InputMaybe<Emails_Inc_Input>;
  _set?: InputMaybe<Emails_Set_Input>;
  pk_columns: Emails_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Emails_ManyArgs = {
  updates: Array<Emails_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ExamsArgs = {
  _inc?: InputMaybe<Exams_Inc_Input>;
  _set?: InputMaybe<Exams_Set_Input>;
  where: Exams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Exams_By_PkArgs = {
  _inc?: InputMaybe<Exams_Inc_Input>;
  _set?: InputMaybe<Exams_Set_Input>;
  pk_columns: Exams_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Exams_ManyArgs = {
  updates: Array<Exams_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MarksArgs = {
  _inc?: InputMaybe<Marks_Inc_Input>;
  _set?: InputMaybe<Marks_Set_Input>;
  where: Marks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Marks_By_PkArgs = {
  _inc?: InputMaybe<Marks_Inc_Input>;
  _set?: InputMaybe<Marks_Set_Input>;
  pk_columns: Marks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Marks_ManyArgs = {
  updates: Array<Marks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MessagesArgs = {
  _inc?: InputMaybe<Messages_Inc_Input>;
  _set?: InputMaybe<Messages_Set_Input>;
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_By_PkArgs = {
  _inc?: InputMaybe<Messages_Inc_Input>;
  _set?: InputMaybe<Messages_Set_Input>;
  pk_columns: Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_ManyArgs = {
  updates: Array<Messages_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ParentsArgs = {
  _inc?: InputMaybe<Parents_Inc_Input>;
  _set?: InputMaybe<Parents_Set_Input>;
  where: Parents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Parents_By_PkArgs = {
  _inc?: InputMaybe<Parents_Inc_Input>;
  _set?: InputMaybe<Parents_Set_Input>;
  pk_columns: Parents_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Parents_ManyArgs = {
  updates: Array<Parents_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Progress_CardsArgs = {
  _inc?: InputMaybe<Progress_Cards_Inc_Input>;
  _set?: InputMaybe<Progress_Cards_Set_Input>;
  where: Progress_Cards_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Progress_Cards_By_PkArgs = {
  _inc?: InputMaybe<Progress_Cards_Inc_Input>;
  _set?: InputMaybe<Progress_Cards_Set_Input>;
  pk_columns: Progress_Cards_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Progress_Cards_ManyArgs = {
  updates: Array<Progress_Cards_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_StudentsArgs = {
  _inc?: InputMaybe<Students_Inc_Input>;
  _set?: InputMaybe<Students_Set_Input>;
  where: Students_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Students_By_PkArgs = {
  _inc?: InputMaybe<Students_Inc_Input>;
  _set?: InputMaybe<Students_Set_Input>;
  pk_columns: Students_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Students_ManyArgs = {
  updates: Array<Students_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SubjectsArgs = {
  _inc?: InputMaybe<Subjects_Inc_Input>;
  _set?: InputMaybe<Subjects_Set_Input>;
  where: Subjects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Subjects_By_PkArgs = {
  _inc?: InputMaybe<Subjects_Inc_Input>;
  _set?: InputMaybe<Subjects_Set_Input>;
  pk_columns: Subjects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Subjects_ManyArgs = {
  updates: Array<Subjects_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TeachersArgs = {
  _inc?: InputMaybe<Teachers_Inc_Input>;
  _set?: InputMaybe<Teachers_Set_Input>;
  where: Teachers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Teachers_By_PkArgs = {
  _inc?: InputMaybe<Teachers_Inc_Input>;
  _set?: InputMaybe<Teachers_Set_Input>;
  pk_columns: Teachers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Teachers_ManyArgs = {
  updates: Array<Teachers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UploadsArgs = {
  _inc?: InputMaybe<Uploads_Inc_Input>;
  _set?: InputMaybe<Uploads_Set_Input>;
  where: Uploads_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Uploads_By_PkArgs = {
  _inc?: InputMaybe<Uploads_Inc_Input>;
  _set?: InputMaybe<Uploads_Set_Input>;
  pk_columns: Uploads_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Uploads_ManyArgs = {
  updates: Array<Uploads_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

/** columns and relationships of "parents" */
export type Parents = {
  __typename?: 'parents';
  address?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email: Scalars['String']['output'];
  /** An array relationship */
  emails: Array<Emails>;
  /** An aggregate relationship */
  emails_aggregate: Emails_Aggregate;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  students: Array<Students>;
  /** An aggregate relationship */
  students_aggregate: Students_Aggregate;
};


/** columns and relationships of "parents" */
export type ParentsEmailsArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


/** columns and relationships of "parents" */
export type ParentsEmails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


/** columns and relationships of "parents" */
export type ParentsStudentsArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


/** columns and relationships of "parents" */
export type ParentsStudents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};

/** aggregated selection of "parents" */
export type Parents_Aggregate = {
  __typename?: 'parents_aggregate';
  aggregate?: Maybe<Parents_Aggregate_Fields>;
  nodes: Array<Parents>;
};

/** aggregate fields of "parents" */
export type Parents_Aggregate_Fields = {
  __typename?: 'parents_aggregate_fields';
  avg?: Maybe<Parents_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Parents_Max_Fields>;
  min?: Maybe<Parents_Min_Fields>;
  stddev?: Maybe<Parents_Stddev_Fields>;
  stddev_pop?: Maybe<Parents_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Parents_Stddev_Samp_Fields>;
  sum?: Maybe<Parents_Sum_Fields>;
  var_pop?: Maybe<Parents_Var_Pop_Fields>;
  var_samp?: Maybe<Parents_Var_Samp_Fields>;
  variance?: Maybe<Parents_Variance_Fields>;
};


/** aggregate fields of "parents" */
export type Parents_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Parents_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Parents_Avg_Fields = {
  __typename?: 'parents_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "parents". All fields are combined with a logical 'AND'. */
export type Parents_Bool_Exp = {
  _and?: InputMaybe<Array<Parents_Bool_Exp>>;
  _not?: InputMaybe<Parents_Bool_Exp>;
  _or?: InputMaybe<Array<Parents_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  emails?: InputMaybe<Emails_Bool_Exp>;
  emails_aggregate?: InputMaybe<Emails_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password_hash?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  students?: InputMaybe<Students_Bool_Exp>;
  students_aggregate?: InputMaybe<Students_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "parents" */
export type Parents_Constraint =
  /** unique or primary key constraint on columns "email" */
  | 'parents_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'parents_pkey';

/** input type for incrementing numeric columns in table "parents" */
export type Parents_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "parents" */
export type Parents_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by_admin_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Emails_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  students?: InputMaybe<Students_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Parents_Max_Fields = {
  __typename?: 'parents_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Parents_Min_Fields = {
  __typename?: 'parents_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "parents" */
export type Parents_Mutation_Response = {
  __typename?: 'parents_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Parents>;
};

/** input type for inserting object relation for remote table "parents" */
export type Parents_Obj_Rel_Insert_Input = {
  data: Parents_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Parents_On_Conflict>;
};

/** on_conflict condition type for table "parents" */
export type Parents_On_Conflict = {
  constraint: Parents_Constraint;
  update_columns?: Array<Parents_Update_Column>;
  where?: InputMaybe<Parents_Bool_Exp>;
};

/** Ordering options when selecting data from "parents". */
export type Parents_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emails_aggregate?: InputMaybe<Emails_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  students_aggregate?: InputMaybe<Students_Aggregate_Order_By>;
};

/** primary key columns input for table: parents */
export type Parents_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "parents" */
export type Parents_Select_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'password_hash'
  /** column name */
  | 'phone';

/** input type for updating data in table "parents" */
export type Parents_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Parents_Stddev_Fields = {
  __typename?: 'parents_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Parents_Stddev_Pop_Fields = {
  __typename?: 'parents_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Parents_Stddev_Samp_Fields = {
  __typename?: 'parents_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "parents" */
export type Parents_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Parents_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Parents_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Parents_Sum_Fields = {
  __typename?: 'parents_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "parents" */
export type Parents_Update_Column =
  /** column name */
  | 'address'
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'password_hash'
  /** column name */
  | 'phone';

export type Parents_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Parents_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Parents_Set_Input>;
  /** filter the rows which have to be updated */
  where: Parents_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Parents_Var_Pop_Fields = {
  __typename?: 'parents_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Parents_Var_Samp_Fields = {
  __typename?: 'parents_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Parents_Variance_Fields = {
  __typename?: 'parents_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "progress_cards" */
export type Progress_Cards = {
  __typename?: 'progress_cards';
  /** An object relationship */
  exam?: Maybe<Exams>;
  exam_id?: Maybe<Scalars['Int']['output']>;
  generated_at?: Maybe<Scalars['timestamp']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  pdf_url?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  student?: Maybe<Students>;
  student_id?: Maybe<Scalars['Int']['output']>;
  total_marks?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "progress_cards" */
export type Progress_Cards_Aggregate = {
  __typename?: 'progress_cards_aggregate';
  aggregate?: Maybe<Progress_Cards_Aggregate_Fields>;
  nodes: Array<Progress_Cards>;
};

export type Progress_Cards_Aggregate_Bool_Exp = {
  count?: InputMaybe<Progress_Cards_Aggregate_Bool_Exp_Count>;
};

export type Progress_Cards_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Progress_Cards_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "progress_cards" */
export type Progress_Cards_Aggregate_Fields = {
  __typename?: 'progress_cards_aggregate_fields';
  avg?: Maybe<Progress_Cards_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Progress_Cards_Max_Fields>;
  min?: Maybe<Progress_Cards_Min_Fields>;
  stddev?: Maybe<Progress_Cards_Stddev_Fields>;
  stddev_pop?: Maybe<Progress_Cards_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Progress_Cards_Stddev_Samp_Fields>;
  sum?: Maybe<Progress_Cards_Sum_Fields>;
  var_pop?: Maybe<Progress_Cards_Var_Pop_Fields>;
  var_samp?: Maybe<Progress_Cards_Var_Samp_Fields>;
  variance?: Maybe<Progress_Cards_Variance_Fields>;
};


/** aggregate fields of "progress_cards" */
export type Progress_Cards_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "progress_cards" */
export type Progress_Cards_Aggregate_Order_By = {
  avg?: InputMaybe<Progress_Cards_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Progress_Cards_Max_Order_By>;
  min?: InputMaybe<Progress_Cards_Min_Order_By>;
  stddev?: InputMaybe<Progress_Cards_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Progress_Cards_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Progress_Cards_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Progress_Cards_Sum_Order_By>;
  var_pop?: InputMaybe<Progress_Cards_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Progress_Cards_Var_Samp_Order_By>;
  variance?: InputMaybe<Progress_Cards_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "progress_cards" */
export type Progress_Cards_Arr_Rel_Insert_Input = {
  data: Array<Progress_Cards_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Progress_Cards_On_Conflict>;
};

/** aggregate avg on columns */
export type Progress_Cards_Avg_Fields = {
  __typename?: 'progress_cards_avg_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "progress_cards" */
export type Progress_Cards_Avg_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "progress_cards". All fields are combined with a logical 'AND'. */
export type Progress_Cards_Bool_Exp = {
  _and?: InputMaybe<Array<Progress_Cards_Bool_Exp>>;
  _not?: InputMaybe<Progress_Cards_Bool_Exp>;
  _or?: InputMaybe<Array<Progress_Cards_Bool_Exp>>;
  exam?: InputMaybe<Exams_Bool_Exp>;
  exam_id?: InputMaybe<Int_Comparison_Exp>;
  generated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  grade?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  pdf_url?: InputMaybe<String_Comparison_Exp>;
  percentage?: InputMaybe<Numeric_Comparison_Exp>;
  student?: InputMaybe<Students_Bool_Exp>;
  student_id?: InputMaybe<Int_Comparison_Exp>;
  total_marks?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "progress_cards" */
export type Progress_Cards_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'progress_cards_pkey';

/** input type for incrementing numeric columns in table "progress_cards" */
export type Progress_Cards_Inc_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  percentage?: InputMaybe<Scalars['numeric']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  total_marks?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "progress_cards" */
export type Progress_Cards_Insert_Input = {
  exam?: InputMaybe<Exams_Obj_Rel_Insert_Input>;
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  generated_at?: InputMaybe<Scalars['timestamp']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  pdf_url?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['numeric']['input']>;
  student?: InputMaybe<Students_Obj_Rel_Insert_Input>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  total_marks?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Progress_Cards_Max_Fields = {
  __typename?: 'progress_cards_max_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  generated_at?: Maybe<Scalars['timestamp']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  pdf_url?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['numeric']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
  total_marks?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "progress_cards" */
export type Progress_Cards_Max_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  generated_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pdf_url?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Progress_Cards_Min_Fields = {
  __typename?: 'progress_cards_min_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  generated_at?: Maybe<Scalars['timestamp']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  pdf_url?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['numeric']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
  total_marks?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "progress_cards" */
export type Progress_Cards_Min_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  generated_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pdf_url?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "progress_cards" */
export type Progress_Cards_Mutation_Response = {
  __typename?: 'progress_cards_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Progress_Cards>;
};

/** on_conflict condition type for table "progress_cards" */
export type Progress_Cards_On_Conflict = {
  constraint: Progress_Cards_Constraint;
  update_columns?: Array<Progress_Cards_Update_Column>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};

/** Ordering options when selecting data from "progress_cards". */
export type Progress_Cards_Order_By = {
  exam?: InputMaybe<Exams_Order_By>;
  exam_id?: InputMaybe<Order_By>;
  generated_at?: InputMaybe<Order_By>;
  grade?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pdf_url?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student?: InputMaybe<Students_Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** primary key columns input for table: progress_cards */
export type Progress_Cards_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "progress_cards" */
export type Progress_Cards_Select_Column =
  /** column name */
  | 'exam_id'
  /** column name */
  | 'generated_at'
  /** column name */
  | 'grade'
  /** column name */
  | 'id'
  /** column name */
  | 'pdf_url'
  /** column name */
  | 'percentage'
  /** column name */
  | 'student_id'
  /** column name */
  | 'total_marks';

/** input type for updating data in table "progress_cards" */
export type Progress_Cards_Set_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  generated_at?: InputMaybe<Scalars['timestamp']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  pdf_url?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['numeric']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  total_marks?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Progress_Cards_Stddev_Fields = {
  __typename?: 'progress_cards_stddev_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "progress_cards" */
export type Progress_Cards_Stddev_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Progress_Cards_Stddev_Pop_Fields = {
  __typename?: 'progress_cards_stddev_pop_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "progress_cards" */
export type Progress_Cards_Stddev_Pop_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Progress_Cards_Stddev_Samp_Fields = {
  __typename?: 'progress_cards_stddev_samp_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "progress_cards" */
export type Progress_Cards_Stddev_Samp_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "progress_cards" */
export type Progress_Cards_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Progress_Cards_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Progress_Cards_Stream_Cursor_Value_Input = {
  exam_id?: InputMaybe<Scalars['Int']['input']>;
  generated_at?: InputMaybe<Scalars['timestamp']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  pdf_url?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['numeric']['input']>;
  student_id?: InputMaybe<Scalars['Int']['input']>;
  total_marks?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Progress_Cards_Sum_Fields = {
  __typename?: 'progress_cards_sum_fields';
  exam_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  percentage?: Maybe<Scalars['numeric']['output']>;
  student_id?: Maybe<Scalars['Int']['output']>;
  total_marks?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "progress_cards" */
export type Progress_Cards_Sum_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** update columns of table "progress_cards" */
export type Progress_Cards_Update_Column =
  /** column name */
  | 'exam_id'
  /** column name */
  | 'generated_at'
  /** column name */
  | 'grade'
  /** column name */
  | 'id'
  /** column name */
  | 'pdf_url'
  /** column name */
  | 'percentage'
  /** column name */
  | 'student_id'
  /** column name */
  | 'total_marks';

export type Progress_Cards_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Progress_Cards_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Progress_Cards_Set_Input>;
  /** filter the rows which have to be updated */
  where: Progress_Cards_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Progress_Cards_Var_Pop_Fields = {
  __typename?: 'progress_cards_var_pop_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "progress_cards" */
export type Progress_Cards_Var_Pop_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Progress_Cards_Var_Samp_Fields = {
  __typename?: 'progress_cards_var_samp_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "progress_cards" */
export type Progress_Cards_Var_Samp_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Progress_Cards_Variance_Fields = {
  __typename?: 'progress_cards_variance_fields';
  exam_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  student_id?: Maybe<Scalars['Float']['output']>;
  total_marks?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "progress_cards" */
export type Progress_Cards_Variance_Order_By = {
  exam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  percentage?: InputMaybe<Order_By>;
  student_id?: InputMaybe<Order_By>;
  total_marks?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "admins" */
  admins: Array<Admins>;
  /** fetch aggregated fields from the table: "admins" */
  admins_aggregate: Admins_Aggregate;
  /** fetch data from the table: "admins" using primary key columns */
  admins_by_pk?: Maybe<Admins>;
  /** An array relationship */
  chat_participants: Array<Chat_Participants>;
  /** An aggregate relationship */
  chat_participants_aggregate: Chat_Participants_Aggregate;
  /** fetch data from the table: "chat_participants" using primary key columns */
  chat_participants_by_pk?: Maybe<Chat_Participants>;
  /** An array relationship */
  chats: Array<Chats>;
  /** An aggregate relationship */
  chats_aggregate: Chats_Aggregate;
  /** fetch data from the table: "chats" using primary key columns */
  chats_by_pk?: Maybe<Chats>;
  /** fetch data from the table: "class_sections" */
  class_sections: Array<Class_Sections>;
  /** fetch aggregated fields from the table: "class_sections" */
  class_sections_aggregate: Class_Sections_Aggregate;
  /** fetch data from the table: "class_sections" using primary key columns */
  class_sections_by_pk?: Maybe<Class_Sections>;
  /** An array relationship */
  emails: Array<Emails>;
  /** An aggregate relationship */
  emails_aggregate: Emails_Aggregate;
  /** fetch data from the table: "emails" using primary key columns */
  emails_by_pk?: Maybe<Emails>;
  /** fetch data from the table: "exams" */
  exams: Array<Exams>;
  /** fetch aggregated fields from the table: "exams" */
  exams_aggregate: Exams_Aggregate;
  /** fetch data from the table: "exams" using primary key columns */
  exams_by_pk?: Maybe<Exams>;
  /** An array relationship */
  marks: Array<Marks>;
  /** An aggregate relationship */
  marks_aggregate: Marks_Aggregate;
  /** fetch data from the table: "marks" using primary key columns */
  marks_by_pk?: Maybe<Marks>;
  /** An array relationship */
  messages: Array<Messages>;
  /** An aggregate relationship */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk?: Maybe<Messages>;
  /** fetch data from the table: "parents" */
  parents: Array<Parents>;
  /** fetch aggregated fields from the table: "parents" */
  parents_aggregate: Parents_Aggregate;
  /** fetch data from the table: "parents" using primary key columns */
  parents_by_pk?: Maybe<Parents>;
  /** An array relationship */
  progress_cards: Array<Progress_Cards>;
  /** An aggregate relationship */
  progress_cards_aggregate: Progress_Cards_Aggregate;
  /** fetch data from the table: "progress_cards" using primary key columns */
  progress_cards_by_pk?: Maybe<Progress_Cards>;
  /** An array relationship */
  students: Array<Students>;
  /** An aggregate relationship */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
  /** An array relationship */
  subjects: Array<Subjects>;
  /** An aggregate relationship */
  subjects_aggregate: Subjects_Aggregate;
  /** fetch data from the table: "subjects" using primary key columns */
  subjects_by_pk?: Maybe<Subjects>;
  /** fetch data from the table: "teachers" */
  teachers: Array<Teachers>;
  /** fetch aggregated fields from the table: "teachers" */
  teachers_aggregate: Teachers_Aggregate;
  /** fetch data from the table: "teachers" using primary key columns */
  teachers_by_pk?: Maybe<Teachers>;
  /** An array relationship */
  uploads: Array<Uploads>;
  /** An aggregate relationship */
  uploads_aggregate: Uploads_Aggregate;
  /** fetch data from the table: "uploads" using primary key columns */
  uploads_by_pk?: Maybe<Uploads>;
};


export type Query_RootAdminsArgs = {
  distinct_on?: InputMaybe<Array<Admins_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admins_Order_By>>;
  where?: InputMaybe<Admins_Bool_Exp>;
};


export type Query_RootAdmins_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admins_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admins_Order_By>>;
  where?: InputMaybe<Admins_Bool_Exp>;
};


export type Query_RootAdmins_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootChat_ParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Participants_Order_By>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


export type Query_RootChat_Participants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Participants_Order_By>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


export type Query_RootChat_Participants_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootChatsArgs = {
  distinct_on?: InputMaybe<Array<Chats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chats_Order_By>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


export type Query_RootChats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chats_Order_By>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


export type Query_RootChats_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootClass_SectionsArgs = {
  distinct_on?: InputMaybe<Array<Class_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Class_Sections_Order_By>>;
  where?: InputMaybe<Class_Sections_Bool_Exp>;
};


export type Query_RootClass_Sections_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Class_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Class_Sections_Order_By>>;
  where?: InputMaybe<Class_Sections_Bool_Exp>;
};


export type Query_RootClass_Sections_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEmailsArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


export type Query_RootEmails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


export type Query_RootEmails_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootExamsArgs = {
  distinct_on?: InputMaybe<Array<Exams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exams_Order_By>>;
  where?: InputMaybe<Exams_Bool_Exp>;
};


export type Query_RootExams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exams_Order_By>>;
  where?: InputMaybe<Exams_Bool_Exp>;
};


export type Query_RootExams_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootMarksArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


export type Query_RootMarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


export type Query_RootMarks_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Query_RootMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Query_RootMessages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootParentsArgs = {
  distinct_on?: InputMaybe<Array<Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Parents_Order_By>>;
  where?: InputMaybe<Parents_Bool_Exp>;
};


export type Query_RootParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Parents_Order_By>>;
  where?: InputMaybe<Parents_Bool_Exp>;
};


export type Query_RootParents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootProgress_CardsArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


export type Query_RootProgress_Cards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


export type Query_RootProgress_Cards_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootStudentsArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


export type Query_RootStudents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


export type Query_RootStudents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootSubjectsArgs = {
  distinct_on?: InputMaybe<Array<Subjects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Subjects_Order_By>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};


export type Query_RootSubjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subjects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Subjects_Order_By>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};


export type Query_RootSubjects_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootTeachersArgs = {
  distinct_on?: InputMaybe<Array<Teachers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teachers_Order_By>>;
  where?: InputMaybe<Teachers_Bool_Exp>;
};


export type Query_RootTeachers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teachers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teachers_Order_By>>;
  where?: InputMaybe<Teachers_Bool_Exp>;
};


export type Query_RootTeachers_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootUploadsArgs = {
  distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Uploads_Order_By>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};


export type Query_RootUploads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Uploads_Order_By>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};


export type Query_RootUploads_By_PkArgs = {
  id: Scalars['Int']['input'];
};

/** columns and relationships of "students" */
export type Students = {
  __typename?: 'students';
  admission_no: Scalars['String']['output'];
  /** An object relationship */
  class_section?: Maybe<Class_Sections>;
  class_section_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  dob?: Maybe<Scalars['date']['output']>;
  /** An array relationship */
  emails: Array<Emails>;
  /** An aggregate relationship */
  emails_aggregate: Emails_Aggregate;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  /** An array relationship */
  marks: Array<Marks>;
  /** An aggregate relationship */
  marks_aggregate: Marks_Aggregate;
  name: Scalars['String']['output'];
  /** An object relationship */
  parent?: Maybe<Parents>;
  parent_id?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  progress_cards: Array<Progress_Cards>;
  /** An aggregate relationship */
  progress_cards_aggregate: Progress_Cards_Aggregate;
};


/** columns and relationships of "students" */
export type StudentsEmailsArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsEmails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsMarksArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsMarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsProgress_CardsArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


/** columns and relationships of "students" */
export type StudentsProgress_Cards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};

/** aggregated selection of "students" */
export type Students_Aggregate = {
  __typename?: 'students_aggregate';
  aggregate?: Maybe<Students_Aggregate_Fields>;
  nodes: Array<Students>;
};

export type Students_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Students_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Students_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Students_Aggregate_Bool_Exp_Count>;
};

export type Students_Aggregate_Bool_Exp_Bool_And = {
  arguments: Students_Select_Column_Students_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Students_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Students_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Students_Select_Column_Students_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Students_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Students_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Students_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Students_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "students" */
export type Students_Aggregate_Fields = {
  __typename?: 'students_aggregate_fields';
  avg?: Maybe<Students_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Students_Max_Fields>;
  min?: Maybe<Students_Min_Fields>;
  stddev?: Maybe<Students_Stddev_Fields>;
  stddev_pop?: Maybe<Students_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Students_Stddev_Samp_Fields>;
  sum?: Maybe<Students_Sum_Fields>;
  var_pop?: Maybe<Students_Var_Pop_Fields>;
  var_samp?: Maybe<Students_Var_Samp_Fields>;
  variance?: Maybe<Students_Variance_Fields>;
};


/** aggregate fields of "students" */
export type Students_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Students_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "students" */
export type Students_Aggregate_Order_By = {
  avg?: InputMaybe<Students_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Students_Max_Order_By>;
  min?: InputMaybe<Students_Min_Order_By>;
  stddev?: InputMaybe<Students_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Students_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Students_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Students_Sum_Order_By>;
  var_pop?: InputMaybe<Students_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Students_Var_Samp_Order_By>;
  variance?: InputMaybe<Students_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "students" */
export type Students_Arr_Rel_Insert_Input = {
  data: Array<Students_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Students_On_Conflict>;
};

/** aggregate avg on columns */
export type Students_Avg_Fields = {
  __typename?: 'students_avg_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "students" */
export type Students_Avg_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "students". All fields are combined with a logical 'AND'. */
export type Students_Bool_Exp = {
  _and?: InputMaybe<Array<Students_Bool_Exp>>;
  _not?: InputMaybe<Students_Bool_Exp>;
  _or?: InputMaybe<Array<Students_Bool_Exp>>;
  admission_no?: InputMaybe<String_Comparison_Exp>;
  class_section?: InputMaybe<Class_Sections_Bool_Exp>;
  class_section_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  dob?: InputMaybe<Date_Comparison_Exp>;
  emails?: InputMaybe<Emails_Bool_Exp>;
  emails_aggregate?: InputMaybe<Emails_Aggregate_Bool_Exp>;
  gender?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  marks?: InputMaybe<Marks_Bool_Exp>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  parent?: InputMaybe<Parents_Bool_Exp>;
  parent_id?: InputMaybe<Int_Comparison_Exp>;
  progress_cards?: InputMaybe<Progress_Cards_Bool_Exp>;
  progress_cards_aggregate?: InputMaybe<Progress_Cards_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "students" */
export type Students_Constraint =
  /** unique or primary key constraint on columns "admission_no" */
  | 'students_admission_no_key'
  /** unique or primary key constraint on columns "id" */
  | 'students_pkey';

/** input type for incrementing numeric columns in table "students" */
export type Students_Inc_Input = {
  class_section_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "students" */
export type Students_Insert_Input = {
  admission_no?: InputMaybe<Scalars['String']['input']>;
  class_section?: InputMaybe<Class_Sections_Obj_Rel_Insert_Input>;
  class_section_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by_admin_id?: InputMaybe<Scalars['Int']['input']>;
  dob?: InputMaybe<Scalars['date']['input']>;
  emails?: InputMaybe<Emails_Arr_Rel_Insert_Input>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  marks?: InputMaybe<Marks_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Parents_Obj_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  progress_cards?: InputMaybe<Progress_Cards_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Students_Max_Fields = {
  __typename?: 'students_max_fields';
  admission_no?: Maybe<Scalars['String']['output']>;
  class_section_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  dob?: Maybe<Scalars['date']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "students" */
export type Students_Max_Order_By = {
  admission_no?: InputMaybe<Order_By>;
  class_section_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dob?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Students_Min_Fields = {
  __typename?: 'students_min_fields';
  admission_no?: Maybe<Scalars['String']['output']>;
  class_section_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  dob?: Maybe<Scalars['date']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "students" */
export type Students_Min_Order_By = {
  admission_no?: InputMaybe<Order_By>;
  class_section_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dob?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "students" */
export type Students_Mutation_Response = {
  __typename?: 'students_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Students>;
};

/** input type for inserting object relation for remote table "students" */
export type Students_Obj_Rel_Insert_Input = {
  data: Students_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Students_On_Conflict>;
};

/** on_conflict condition type for table "students" */
export type Students_On_Conflict = {
  constraint: Students_Constraint;
  update_columns?: Array<Students_Update_Column>;
  where?: InputMaybe<Students_Bool_Exp>;
};

/** Ordering options when selecting data from "students". */
export type Students_Order_By = {
  admission_no?: InputMaybe<Order_By>;
  class_section?: InputMaybe<Class_Sections_Order_By>;
  class_section_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dob?: InputMaybe<Order_By>;
  emails_aggregate?: InputMaybe<Emails_Aggregate_Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  parent?: InputMaybe<Parents_Order_By>;
  parent_id?: InputMaybe<Order_By>;
  progress_cards_aggregate?: InputMaybe<Progress_Cards_Aggregate_Order_By>;
};

/** primary key columns input for table: students */
export type Students_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "students" */
export type Students_Select_Column =
  /** column name */
  | 'admission_no'
  /** column name */
  | 'class_section_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'dob'
  /** column name */
  | 'gender'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

/** select "students_aggregate_bool_exp_bool_and_arguments_columns" columns of table "students" */
export type Students_Select_Column_Students_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_active';

/** select "students_aggregate_bool_exp_bool_or_arguments_columns" columns of table "students" */
export type Students_Select_Column_Students_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_active';

/** input type for updating data in table "students" */
export type Students_Set_Input = {
  admission_no?: InputMaybe<Scalars['String']['input']>;
  class_section_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  dob?: InputMaybe<Scalars['date']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Students_Stddev_Fields = {
  __typename?: 'students_stddev_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "students" */
export type Students_Stddev_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Students_Stddev_Pop_Fields = {
  __typename?: 'students_stddev_pop_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "students" */
export type Students_Stddev_Pop_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Students_Stddev_Samp_Fields = {
  __typename?: 'students_stddev_samp_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "students" */
export type Students_Stddev_Samp_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "students" */
export type Students_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Students_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Students_Stream_Cursor_Value_Input = {
  admission_no?: InputMaybe<Scalars['String']['input']>;
  class_section_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  dob?: InputMaybe<Scalars['date']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Students_Sum_Fields = {
  __typename?: 'students_sum_fields';
  class_section_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "students" */
export type Students_Sum_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** update columns of table "students" */
export type Students_Update_Column =
  /** column name */
  | 'admission_no'
  /** column name */
  | 'class_section_id'
  /** column name */
  | 'created_at'
  /** column name */
  | 'dob'
  /** column name */
  | 'gender'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'name'
  /** column name */
  | 'parent_id';

export type Students_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Students_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Students_Set_Input>;
  /** filter the rows which have to be updated */
  where: Students_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Students_Var_Pop_Fields = {
  __typename?: 'students_var_pop_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "students" */
export type Students_Var_Pop_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Students_Var_Samp_Fields = {
  __typename?: 'students_var_samp_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "students" */
export type Students_Var_Samp_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Students_Variance_Fields = {
  __typename?: 'students_variance_fields';
  class_section_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  parent_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "students" */
export type Students_Variance_Order_By = {
  class_section_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "subjects" */
export type Subjects = {
  __typename?: 'subjects';
  class_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /** An array relationship */
  marks: Array<Marks>;
  /** An aggregate relationship */
  marks_aggregate: Marks_Aggregate;
  name: Scalars['String']['output'];
  /** An object relationship */
  teacher?: Maybe<Teachers>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};


/** columns and relationships of "subjects" */
export type SubjectsMarksArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "subjects" */
export type SubjectsMarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};

/** aggregated selection of "subjects" */
export type Subjects_Aggregate = {
  __typename?: 'subjects_aggregate';
  aggregate?: Maybe<Subjects_Aggregate_Fields>;
  nodes: Array<Subjects>;
};

export type Subjects_Aggregate_Bool_Exp = {
  count?: InputMaybe<Subjects_Aggregate_Bool_Exp_Count>;
};

export type Subjects_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Subjects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Subjects_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "subjects" */
export type Subjects_Aggregate_Fields = {
  __typename?: 'subjects_aggregate_fields';
  avg?: Maybe<Subjects_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Subjects_Max_Fields>;
  min?: Maybe<Subjects_Min_Fields>;
  stddev?: Maybe<Subjects_Stddev_Fields>;
  stddev_pop?: Maybe<Subjects_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Subjects_Stddev_Samp_Fields>;
  sum?: Maybe<Subjects_Sum_Fields>;
  var_pop?: Maybe<Subjects_Var_Pop_Fields>;
  var_samp?: Maybe<Subjects_Var_Samp_Fields>;
  variance?: Maybe<Subjects_Variance_Fields>;
};


/** aggregate fields of "subjects" */
export type Subjects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Subjects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "subjects" */
export type Subjects_Aggregate_Order_By = {
  avg?: InputMaybe<Subjects_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Subjects_Max_Order_By>;
  min?: InputMaybe<Subjects_Min_Order_By>;
  stddev?: InputMaybe<Subjects_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Subjects_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Subjects_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Subjects_Sum_Order_By>;
  var_pop?: InputMaybe<Subjects_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Subjects_Var_Samp_Order_By>;
  variance?: InputMaybe<Subjects_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "subjects" */
export type Subjects_Arr_Rel_Insert_Input = {
  data: Array<Subjects_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Subjects_On_Conflict>;
};

/** aggregate avg on columns */
export type Subjects_Avg_Fields = {
  __typename?: 'subjects_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "subjects" */
export type Subjects_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "subjects". All fields are combined with a logical 'AND'. */
export type Subjects_Bool_Exp = {
  _and?: InputMaybe<Array<Subjects_Bool_Exp>>;
  _not?: InputMaybe<Subjects_Bool_Exp>;
  _or?: InputMaybe<Array<Subjects_Bool_Exp>>;
  class_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  marks?: InputMaybe<Marks_Bool_Exp>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  teacher?: InputMaybe<Teachers_Bool_Exp>;
  teacher_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "subjects" */
export type Subjects_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'subjects_pkey';

/** input type for incrementing numeric columns in table "subjects" */
export type Subjects_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "subjects" */
export type Subjects_Insert_Input = {
  class_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  marks?: InputMaybe<Marks_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  teacher?: InputMaybe<Teachers_Obj_Rel_Insert_Input>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Subjects_Max_Fields = {
  __typename?: 'subjects_max_fields';
  class_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "subjects" */
export type Subjects_Max_Order_By = {
  class_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Subjects_Min_Fields = {
  __typename?: 'subjects_min_fields';
  class_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "subjects" */
export type Subjects_Min_Order_By = {
  class_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "subjects" */
export type Subjects_Mutation_Response = {
  __typename?: 'subjects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Subjects>;
};

/** input type for inserting object relation for remote table "subjects" */
export type Subjects_Obj_Rel_Insert_Input = {
  data: Subjects_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Subjects_On_Conflict>;
};

/** on_conflict condition type for table "subjects" */
export type Subjects_On_Conflict = {
  constraint: Subjects_Constraint;
  update_columns?: Array<Subjects_Update_Column>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};

/** Ordering options when selecting data from "subjects". */
export type Subjects_Order_By = {
  class_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  teacher?: InputMaybe<Teachers_Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: subjects */
export type Subjects_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "subjects" */
export type Subjects_Select_Column =
  /** column name */
  | 'class_name'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'teacher_id';

/** input type for updating data in table "subjects" */
export type Subjects_Set_Input = {
  class_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Subjects_Stddev_Fields = {
  __typename?: 'subjects_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "subjects" */
export type Subjects_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Subjects_Stddev_Pop_Fields = {
  __typename?: 'subjects_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "subjects" */
export type Subjects_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Subjects_Stddev_Samp_Fields = {
  __typename?: 'subjects_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "subjects" */
export type Subjects_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "subjects" */
export type Subjects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Subjects_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Subjects_Stream_Cursor_Value_Input = {
  class_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  teacher_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Subjects_Sum_Fields = {
  __typename?: 'subjects_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  teacher_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "subjects" */
export type Subjects_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** update columns of table "subjects" */
export type Subjects_Update_Column =
  /** column name */
  | 'class_name'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'teacher_id';

export type Subjects_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Subjects_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Subjects_Set_Input>;
  /** filter the rows which have to be updated */
  where: Subjects_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Subjects_Var_Pop_Fields = {
  __typename?: 'subjects_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "subjects" */
export type Subjects_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Subjects_Var_Samp_Fields = {
  __typename?: 'subjects_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "subjects" */
export type Subjects_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Subjects_Variance_Fields = {
  __typename?: 'subjects_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  teacher_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "subjects" */
export type Subjects_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  teacher_id?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "admins" */
  admins: Array<Admins>;
  /** fetch aggregated fields from the table: "admins" */
  admins_aggregate: Admins_Aggregate;
  /** fetch data from the table: "admins" using primary key columns */
  admins_by_pk?: Maybe<Admins>;
  /** fetch data from the table in a streaming manner: "admins" */
  admins_stream: Array<Admins>;
  /** An array relationship */
  chat_participants: Array<Chat_Participants>;
  /** An aggregate relationship */
  chat_participants_aggregate: Chat_Participants_Aggregate;
  /** fetch data from the table: "chat_participants" using primary key columns */
  chat_participants_by_pk?: Maybe<Chat_Participants>;
  /** fetch data from the table in a streaming manner: "chat_participants" */
  chat_participants_stream: Array<Chat_Participants>;
  /** An array relationship */
  chats: Array<Chats>;
  /** An aggregate relationship */
  chats_aggregate: Chats_Aggregate;
  /** fetch data from the table: "chats" using primary key columns */
  chats_by_pk?: Maybe<Chats>;
  /** fetch data from the table in a streaming manner: "chats" */
  chats_stream: Array<Chats>;
  /** fetch data from the table: "class_sections" */
  class_sections: Array<Class_Sections>;
  /** fetch aggregated fields from the table: "class_sections" */
  class_sections_aggregate: Class_Sections_Aggregate;
  /** fetch data from the table: "class_sections" using primary key columns */
  class_sections_by_pk?: Maybe<Class_Sections>;
  /** fetch data from the table in a streaming manner: "class_sections" */
  class_sections_stream: Array<Class_Sections>;
  /** An array relationship */
  emails: Array<Emails>;
  /** An aggregate relationship */
  emails_aggregate: Emails_Aggregate;
  /** fetch data from the table: "emails" using primary key columns */
  emails_by_pk?: Maybe<Emails>;
  /** fetch data from the table in a streaming manner: "emails" */
  emails_stream: Array<Emails>;
  /** fetch data from the table: "exams" */
  exams: Array<Exams>;
  /** fetch aggregated fields from the table: "exams" */
  exams_aggregate: Exams_Aggregate;
  /** fetch data from the table: "exams" using primary key columns */
  exams_by_pk?: Maybe<Exams>;
  /** fetch data from the table in a streaming manner: "exams" */
  exams_stream: Array<Exams>;
  /** An array relationship */
  marks: Array<Marks>;
  /** An aggregate relationship */
  marks_aggregate: Marks_Aggregate;
  /** fetch data from the table: "marks" using primary key columns */
  marks_by_pk?: Maybe<Marks>;
  /** fetch data from the table in a streaming manner: "marks" */
  marks_stream: Array<Marks>;
  /** An array relationship */
  messages: Array<Messages>;
  /** An aggregate relationship */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk?: Maybe<Messages>;
  /** fetch data from the table in a streaming manner: "messages" */
  messages_stream: Array<Messages>;
  /** fetch data from the table: "parents" */
  parents: Array<Parents>;
  /** fetch aggregated fields from the table: "parents" */
  parents_aggregate: Parents_Aggregate;
  /** fetch data from the table: "parents" using primary key columns */
  parents_by_pk?: Maybe<Parents>;
  /** fetch data from the table in a streaming manner: "parents" */
  parents_stream: Array<Parents>;
  /** An array relationship */
  progress_cards: Array<Progress_Cards>;
  /** An aggregate relationship */
  progress_cards_aggregate: Progress_Cards_Aggregate;
  /** fetch data from the table: "progress_cards" using primary key columns */
  progress_cards_by_pk?: Maybe<Progress_Cards>;
  /** fetch data from the table in a streaming manner: "progress_cards" */
  progress_cards_stream: Array<Progress_Cards>;
  /** An array relationship */
  students: Array<Students>;
  /** An aggregate relationship */
  students_aggregate: Students_Aggregate;
  /** fetch data from the table: "students" using primary key columns */
  students_by_pk?: Maybe<Students>;
  /** fetch data from the table in a streaming manner: "students" */
  students_stream: Array<Students>;
  /** An array relationship */
  subjects: Array<Subjects>;
  /** An aggregate relationship */
  subjects_aggregate: Subjects_Aggregate;
  /** fetch data from the table: "subjects" using primary key columns */
  subjects_by_pk?: Maybe<Subjects>;
  /** fetch data from the table in a streaming manner: "subjects" */
  subjects_stream: Array<Subjects>;
  /** fetch data from the table: "teachers" */
  teachers: Array<Teachers>;
  /** fetch aggregated fields from the table: "teachers" */
  teachers_aggregate: Teachers_Aggregate;
  /** fetch data from the table: "teachers" using primary key columns */
  teachers_by_pk?: Maybe<Teachers>;
  /** fetch data from the table in a streaming manner: "teachers" */
  teachers_stream: Array<Teachers>;
  /** An array relationship */
  uploads: Array<Uploads>;
  /** An aggregate relationship */
  uploads_aggregate: Uploads_Aggregate;
  /** fetch data from the table: "uploads" using primary key columns */
  uploads_by_pk?: Maybe<Uploads>;
  /** fetch data from the table in a streaming manner: "uploads" */
  uploads_stream: Array<Uploads>;
};


export type Subscription_RootAdminsArgs = {
  distinct_on?: InputMaybe<Array<Admins_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admins_Order_By>>;
  where?: InputMaybe<Admins_Bool_Exp>;
};


export type Subscription_RootAdmins_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admins_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Admins_Order_By>>;
  where?: InputMaybe<Admins_Bool_Exp>;
};


export type Subscription_RootAdmins_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootAdmins_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Admins_Stream_Cursor_Input>>;
  where?: InputMaybe<Admins_Bool_Exp>;
};


export type Subscription_RootChat_ParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Participants_Order_By>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


export type Subscription_RootChat_Participants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Participants_Order_By>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


export type Subscription_RootChat_Participants_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootChat_Participants_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chat_Participants_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Participants_Bool_Exp>;
};


export type Subscription_RootChatsArgs = {
  distinct_on?: InputMaybe<Array<Chats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chats_Order_By>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


export type Subscription_RootChats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chats_Order_By>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


export type Subscription_RootChats_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootChats_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chats_Stream_Cursor_Input>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


export type Subscription_RootClass_SectionsArgs = {
  distinct_on?: InputMaybe<Array<Class_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Class_Sections_Order_By>>;
  where?: InputMaybe<Class_Sections_Bool_Exp>;
};


export type Subscription_RootClass_Sections_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Class_Sections_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Class_Sections_Order_By>>;
  where?: InputMaybe<Class_Sections_Bool_Exp>;
};


export type Subscription_RootClass_Sections_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootClass_Sections_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Class_Sections_Stream_Cursor_Input>>;
  where?: InputMaybe<Class_Sections_Bool_Exp>;
};


export type Subscription_RootEmailsArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


export type Subscription_RootEmails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Emails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Emails_Order_By>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


export type Subscription_RootEmails_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEmails_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Emails_Stream_Cursor_Input>>;
  where?: InputMaybe<Emails_Bool_Exp>;
};


export type Subscription_RootExamsArgs = {
  distinct_on?: InputMaybe<Array<Exams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exams_Order_By>>;
  where?: InputMaybe<Exams_Bool_Exp>;
};


export type Subscription_RootExams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exams_Order_By>>;
  where?: InputMaybe<Exams_Bool_Exp>;
};


export type Subscription_RootExams_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootExams_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Exams_Stream_Cursor_Input>>;
  where?: InputMaybe<Exams_Bool_Exp>;
};


export type Subscription_RootMarksArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


export type Subscription_RootMarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


export type Subscription_RootMarks_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootMarks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Marks_Stream_Cursor_Input>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


export type Subscription_RootMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootMessages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootMessages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Messages_Stream_Cursor_Input>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootParentsArgs = {
  distinct_on?: InputMaybe<Array<Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Parents_Order_By>>;
  where?: InputMaybe<Parents_Bool_Exp>;
};


export type Subscription_RootParents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Parents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Parents_Order_By>>;
  where?: InputMaybe<Parents_Bool_Exp>;
};


export type Subscription_RootParents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootParents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Parents_Stream_Cursor_Input>>;
  where?: InputMaybe<Parents_Bool_Exp>;
};


export type Subscription_RootProgress_CardsArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


export type Subscription_RootProgress_Cards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Progress_Cards_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Progress_Cards_Order_By>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


export type Subscription_RootProgress_Cards_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootProgress_Cards_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Progress_Cards_Stream_Cursor_Input>>;
  where?: InputMaybe<Progress_Cards_Bool_Exp>;
};


export type Subscription_RootStudentsArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


export type Subscription_RootStudents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Students_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Students_Order_By>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


export type Subscription_RootStudents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootStudents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Students_Stream_Cursor_Input>>;
  where?: InputMaybe<Students_Bool_Exp>;
};


export type Subscription_RootSubjectsArgs = {
  distinct_on?: InputMaybe<Array<Subjects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Subjects_Order_By>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};


export type Subscription_RootSubjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subjects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Subjects_Order_By>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};


export type Subscription_RootSubjects_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootSubjects_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Subjects_Stream_Cursor_Input>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};


export type Subscription_RootTeachersArgs = {
  distinct_on?: InputMaybe<Array<Teachers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teachers_Order_By>>;
  where?: InputMaybe<Teachers_Bool_Exp>;
};


export type Subscription_RootTeachers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teachers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teachers_Order_By>>;
  where?: InputMaybe<Teachers_Bool_Exp>;
};


export type Subscription_RootTeachers_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootTeachers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Teachers_Stream_Cursor_Input>>;
  where?: InputMaybe<Teachers_Bool_Exp>;
};


export type Subscription_RootUploadsArgs = {
  distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Uploads_Order_By>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};


export type Subscription_RootUploads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Uploads_Order_By>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};


export type Subscription_RootUploads_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootUploads_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Uploads_Stream_Cursor_Input>>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};

/** columns and relationships of "teachers" */
export type Teachers = {
  __typename?: 'teachers';
  /** An array relationship */
  chats: Array<Chats>;
  /** An aggregate relationship */
  chats_aggregate: Chats_Aggregate;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  /** An array relationship */
  marks: Array<Marks>;
  /** An aggregate relationship */
  marks_aggregate: Marks_Aggregate;
  name: Scalars['String']['output'];
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  qualification?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  subjects: Array<Subjects>;
  /** An aggregate relationship */
  subjects_aggregate: Subjects_Aggregate;
};


/** columns and relationships of "teachers" */
export type TeachersChatsArgs = {
  distinct_on?: InputMaybe<Array<Chats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chats_Order_By>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


/** columns and relationships of "teachers" */
export type TeachersChats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chats_Order_By>>;
  where?: InputMaybe<Chats_Bool_Exp>;
};


/** columns and relationships of "teachers" */
export type TeachersMarksArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "teachers" */
export type TeachersMarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Marks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Marks_Order_By>>;
  where?: InputMaybe<Marks_Bool_Exp>;
};


/** columns and relationships of "teachers" */
export type TeachersSubjectsArgs = {
  distinct_on?: InputMaybe<Array<Subjects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Subjects_Order_By>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};


/** columns and relationships of "teachers" */
export type TeachersSubjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Subjects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Subjects_Order_By>>;
  where?: InputMaybe<Subjects_Bool_Exp>;
};

/** aggregated selection of "teachers" */
export type Teachers_Aggregate = {
  __typename?: 'teachers_aggregate';
  aggregate?: Maybe<Teachers_Aggregate_Fields>;
  nodes: Array<Teachers>;
};

/** aggregate fields of "teachers" */
export type Teachers_Aggregate_Fields = {
  __typename?: 'teachers_aggregate_fields';
  avg?: Maybe<Teachers_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Teachers_Max_Fields>;
  min?: Maybe<Teachers_Min_Fields>;
  stddev?: Maybe<Teachers_Stddev_Fields>;
  stddev_pop?: Maybe<Teachers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Teachers_Stddev_Samp_Fields>;
  sum?: Maybe<Teachers_Sum_Fields>;
  var_pop?: Maybe<Teachers_Var_Pop_Fields>;
  var_samp?: Maybe<Teachers_Var_Samp_Fields>;
  variance?: Maybe<Teachers_Variance_Fields>;
};


/** aggregate fields of "teachers" */
export type Teachers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Teachers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Teachers_Avg_Fields = {
  __typename?: 'teachers_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "teachers". All fields are combined with a logical 'AND'. */
export type Teachers_Bool_Exp = {
  _and?: InputMaybe<Array<Teachers_Bool_Exp>>;
  _not?: InputMaybe<Teachers_Bool_Exp>;
  _or?: InputMaybe<Array<Teachers_Bool_Exp>>;
  chats?: InputMaybe<Chats_Bool_Exp>;
  chats_aggregate?: InputMaybe<Chats_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  marks?: InputMaybe<Marks_Bool_Exp>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  password_hash?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  qualification?: InputMaybe<String_Comparison_Exp>;
  subjects?: InputMaybe<Subjects_Bool_Exp>;
  subjects_aggregate?: InputMaybe<Subjects_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "teachers" */
export type Teachers_Constraint =
  /** unique or primary key constraint on columns "email" */
  | 'teachers_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'teachers_pkey';

/** input type for incrementing numeric columns in table "teachers" */
export type Teachers_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "teachers" */
export type Teachers_Insert_Input = {
  chats?: InputMaybe<Chats_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  created_by_admin_id?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  marks?: InputMaybe<Marks_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Subjects_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Teachers_Max_Fields = {
  __typename?: 'teachers_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  qualification?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Teachers_Min_Fields = {
  __typename?: 'teachers_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  qualification?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "teachers" */
export type Teachers_Mutation_Response = {
  __typename?: 'teachers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Teachers>;
};

/** input type for inserting object relation for remote table "teachers" */
export type Teachers_Obj_Rel_Insert_Input = {
  data: Teachers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Teachers_On_Conflict>;
};

/** on_conflict condition type for table "teachers" */
export type Teachers_On_Conflict = {
  constraint: Teachers_Constraint;
  update_columns?: Array<Teachers_Update_Column>;
  where?: InputMaybe<Teachers_Bool_Exp>;
};

/** Ordering options when selecting data from "teachers". */
export type Teachers_Order_By = {
  chats_aggregate?: InputMaybe<Chats_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  marks_aggregate?: InputMaybe<Marks_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  qualification?: InputMaybe<Order_By>;
  subjects_aggregate?: InputMaybe<Subjects_Aggregate_Order_By>;
};

/** primary key columns input for table: teachers */
export type Teachers_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "teachers" */
export type Teachers_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'name'
  /** column name */
  | 'password_hash'
  /** column name */
  | 'phone'
  /** column name */
  | 'qualification';

/** input type for updating data in table "teachers" */
export type Teachers_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Teachers_Stddev_Fields = {
  __typename?: 'teachers_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Teachers_Stddev_Pop_Fields = {
  __typename?: 'teachers_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Teachers_Stddev_Samp_Fields = {
  __typename?: 'teachers_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "teachers" */
export type Teachers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Teachers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Teachers_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Teachers_Sum_Fields = {
  __typename?: 'teachers_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "teachers" */
export type Teachers_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'name'
  /** column name */
  | 'password_hash'
  /** column name */
  | 'phone'
  /** column name */
  | 'qualification';

export type Teachers_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Teachers_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Teachers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Teachers_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Teachers_Var_Pop_Fields = {
  __typename?: 'teachers_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Teachers_Var_Samp_Fields = {
  __typename?: 'teachers_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Teachers_Variance_Fields = {
  __typename?: 'teachers_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** columns and relationships of "uploads" */
export type Uploads = {
  __typename?: 'uploads';
  /** An object relationship */
  admin?: Maybe<Admins>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  rows_count?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploaded_by?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "uploads" */
export type Uploads_Aggregate = {
  __typename?: 'uploads_aggregate';
  aggregate?: Maybe<Uploads_Aggregate_Fields>;
  nodes: Array<Uploads>;
};

export type Uploads_Aggregate_Bool_Exp = {
  count?: InputMaybe<Uploads_Aggregate_Bool_Exp_Count>;
};

export type Uploads_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Uploads_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Uploads_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "uploads" */
export type Uploads_Aggregate_Fields = {
  __typename?: 'uploads_aggregate_fields';
  avg?: Maybe<Uploads_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Uploads_Max_Fields>;
  min?: Maybe<Uploads_Min_Fields>;
  stddev?: Maybe<Uploads_Stddev_Fields>;
  stddev_pop?: Maybe<Uploads_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Uploads_Stddev_Samp_Fields>;
  sum?: Maybe<Uploads_Sum_Fields>;
  var_pop?: Maybe<Uploads_Var_Pop_Fields>;
  var_samp?: Maybe<Uploads_Var_Samp_Fields>;
  variance?: Maybe<Uploads_Variance_Fields>;
};


/** aggregate fields of "uploads" */
export type Uploads_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Uploads_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "uploads" */
export type Uploads_Aggregate_Order_By = {
  avg?: InputMaybe<Uploads_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Uploads_Max_Order_By>;
  min?: InputMaybe<Uploads_Min_Order_By>;
  stddev?: InputMaybe<Uploads_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Uploads_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Uploads_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Uploads_Sum_Order_By>;
  var_pop?: InputMaybe<Uploads_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Uploads_Var_Samp_Order_By>;
  variance?: InputMaybe<Uploads_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "uploads" */
export type Uploads_Arr_Rel_Insert_Input = {
  data: Array<Uploads_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Uploads_On_Conflict>;
};

/** aggregate avg on columns */
export type Uploads_Avg_Fields = {
  __typename?: 'uploads_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "uploads" */
export type Uploads_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "uploads". All fields are combined with a logical 'AND'. */
export type Uploads_Bool_Exp = {
  _and?: InputMaybe<Array<Uploads_Bool_Exp>>;
  _not?: InputMaybe<Uploads_Bool_Exp>;
  _or?: InputMaybe<Array<Uploads_Bool_Exp>>;
  admin?: InputMaybe<Admins_Bool_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  rows_count?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  uploaded_by?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "uploads" */
export type Uploads_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'uploads_pkey';

/** input type for incrementing numeric columns in table "uploads" */
export type Uploads_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  rows_count?: InputMaybe<Scalars['Int']['input']>;
  uploaded_by?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "uploads" */
export type Uploads_Insert_Input = {
  admin?: InputMaybe<Admins_Obj_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rows_count?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uploaded_by?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Uploads_Max_Fields = {
  __typename?: 'uploads_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  rows_count?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploaded_by?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "uploads" */
export type Uploads_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Uploads_Min_Fields = {
  __typename?: 'uploads_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  rows_count?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploaded_by?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "uploads" */
export type Uploads_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "uploads" */
export type Uploads_Mutation_Response = {
  __typename?: 'uploads_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Uploads>;
};

/** on_conflict condition type for table "uploads" */
export type Uploads_On_Conflict = {
  constraint: Uploads_Constraint;
  update_columns?: Array<Uploads_Update_Column>;
  where?: InputMaybe<Uploads_Bool_Exp>;
};

/** Ordering options when selecting data from "uploads". */
export type Uploads_Order_By = {
  admin?: InputMaybe<Admins_Order_By>;
  created_at?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** primary key columns input for table: uploads */
export type Uploads_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "uploads" */
export type Uploads_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'filename'
  /** column name */
  | 'id'
  /** column name */
  | 'rows_count'
  /** column name */
  | 'type'
  /** column name */
  | 'uploaded_by';

/** input type for updating data in table "uploads" */
export type Uploads_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rows_count?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uploaded_by?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Uploads_Stddev_Fields = {
  __typename?: 'uploads_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "uploads" */
export type Uploads_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Uploads_Stddev_Pop_Fields = {
  __typename?: 'uploads_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "uploads" */
export type Uploads_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Uploads_Stddev_Samp_Fields = {
  __typename?: 'uploads_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "uploads" */
export type Uploads_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "uploads" */
export type Uploads_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Uploads_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Uploads_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rows_count?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  uploaded_by?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Uploads_Sum_Fields = {
  __typename?: 'uploads_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  rows_count?: Maybe<Scalars['Int']['output']>;
  uploaded_by?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "uploads" */
export type Uploads_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** update columns of table "uploads" */
export type Uploads_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'filename'
  /** column name */
  | 'id'
  /** column name */
  | 'rows_count'
  /** column name */
  | 'type'
  /** column name */
  | 'uploaded_by';

export type Uploads_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Uploads_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Uploads_Set_Input>;
  /** filter the rows which have to be updated */
  where: Uploads_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Uploads_Var_Pop_Fields = {
  __typename?: 'uploads_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "uploads" */
export type Uploads_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Uploads_Var_Samp_Fields = {
  __typename?: 'uploads_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "uploads" */
export type Uploads_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Uploads_Variance_Fields = {
  __typename?: 'uploads_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rows_count?: Maybe<Scalars['Float']['output']>;
  uploaded_by?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "uploads" */
export type Uploads_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  rows_count?: InputMaybe<Order_By>;
  uploaded_by?: InputMaybe<Order_By>;
};

export type InsertAdminMutationVariables = Exact<{
  school: Scalars['String']['input'];
  email: Scalars['String']['input'];
  pass: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertAdminMutation = { __typename?: 'mutation_root', insert_admins_one?: { __typename?: 'admins', id: number } | null };

export type InsertClassSectionMutationVariables = Exact<{
  object: Class_Sections_Insert_Input;
}>;


export type InsertClassSectionMutation = { __typename?: 'mutation_root', insert_class_sections_one?: { __typename?: 'class_sections', id: number } | null };

export type GetStudentByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetStudentByIdQuery = { __typename?: 'query_root', students_by_pk?: { __typename?: 'students', id: number, name: string, admission_no: string, parent_id?: number | null, marks: Array<{ __typename?: 'marks', id: number, marks_obtained?: any | null, max_marks?: any | null, subject?: { __typename?: 'subjects', name: string } | null }> } | null };

export type GetStudentsByParentIdQueryVariables = Exact<{
  parentId: Scalars['Int']['input'];
}>;


export type GetStudentsByParentIdQuery = { __typename?: 'query_root', students: Array<{ __typename?: 'students', id: number, name: string, admission_no: string, parent_id?: number | null, marks: Array<{ __typename?: 'marks', id: number, marks_obtained?: any | null, max_marks?: any | null, subject?: { __typename?: 'subjects', name: string } | null }> }> };

export type GetTeacherIdByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetTeacherIdByEmailQuery = { __typename?: 'query_root', teachers: Array<{ __typename?: 'teachers', id: number, email: string, name: string }> };

export type SelectAdminByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SelectAdminByEmailQuery = { __typename?: 'query_root', admins: Array<{ __typename?: 'admins', id: number, school_name: string, password_hash: string }> };

export type SelectStudentByDetailsQueryVariables = Exact<{
  admission_no: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type SelectStudentByDetailsQuery = { __typename?: 'query_root', students: Array<{ __typename?: 'students', id: number, name: string }> };

export type SelectTeacherByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SelectTeacherByEmailQuery = { __typename?: 'query_root', teachers: Array<{ __typename?: 'teachers', id: number, name: string, email: string, password_hash?: string | null }> };

export type SelectParentByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SelectParentByEmailQuery = { __typename?: 'query_root', parents: Array<{ __typename?: 'parents', id: number, name: string, email: string, password_hash?: string | null }> };

export type InsertMarksMutationVariables = Exact<{
  objects: Array<Marks_Insert_Input> | Marks_Insert_Input;
}>;


export type InsertMarksMutation = { __typename?: 'mutation_root', insert_marks?: { __typename?: 'marks_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'marks', id: number, student_id?: number | null, marks_obtained?: any | null, max_marks?: any | null, grade?: string | null, remarks?: string | null }> } | null };

export type GetStudentsByClassSectionQueryVariables = Exact<{
  class_name: Scalars['String']['input'];
  section_name: Scalars['String']['input'];
}>;


export type GetStudentsByClassSectionQuery = { __typename?: 'query_root', students: Array<{ __typename?: 'students', id: number, admission_no: string, name: string, dob?: any | null, gender?: string | null }> };

export type FindClassSectionQueryVariables = Exact<{
  class_name: Scalars['String']['input'];
  section_name: Scalars['String']['input'];
}>;


export type FindClassSectionQuery = { __typename?: 'query_root', class_sections: Array<{ __typename?: 'class_sections', id: number, class_name: string, section_name: string, display_name?: string | null }> };

export type FindSubjectQueryVariables = Exact<{
  name: Scalars['String']['input'];
  class_name: Scalars['String']['input'];
}>;


export type FindSubjectQuery = { __typename?: 'query_root', subjects: Array<{ __typename?: 'subjects', id: number, name: string, class_name: string, teacher_id?: number | null }> };

export type FindExamQueryVariables = Exact<{
  name: Scalars['String']['input'];
  academic_year: Scalars['String']['input'];
}>;


export type FindExamQuery = { __typename?: 'query_root', exams: Array<{ __typename?: 'exams', id: number, name: string, academic_year: string, start_date?: any | null, end_date?: any | null }> };

export type GetExistingMarksQueryVariables = Exact<{
  student_ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  subject_id: Scalars['Int']['input'];
  exam_id: Scalars['Int']['input'];
}>;


export type GetExistingMarksQuery = { __typename?: 'query_root', marks: Array<{ __typename?: 'marks', id: number, student_id?: number | null, marks_obtained?: any | null, max_marks?: any | null, grade?: string | null, remarks?: string | null, is_finalized?: boolean | null }> };

export type UpsertClassSectionMutationVariables = Exact<{
  class_name: Scalars['String']['input'];
  section_name: Scalars['String']['input'];
}>;


export type UpsertClassSectionMutation = { __typename?: 'mutation_root', insert_class_sections_one?: { __typename?: 'class_sections', id: number, class_name: string, section_name: string, display_name?: string | null } | null };

export type CreateSubjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  class_name: Scalars['String']['input'];
  teacher_id: Scalars['Int']['input'];
}>;


export type CreateSubjectMutation = { __typename?: 'mutation_root', insert_subjects_one?: { __typename?: 'subjects', id: number, name: string, class_name: string } | null };

export type CreateExamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  academic_year: Scalars['String']['input'];
}>;


export type CreateExamMutation = { __typename?: 'mutation_root', insert_exams_one?: { __typename?: 'exams', id: number, name: string, academic_year: string } | null };

export type FinalizeMarksMutationVariables = Exact<{
  subject_id: Scalars['Int']['input'];
  exam_id: Scalars['Int']['input'];
  student_ids: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type FinalizeMarksMutation = { __typename?: 'mutation_root', update_marks?: { __typename?: 'marks_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'marks', id: number, student_id?: number | null, is_finalized?: boolean | null }> } | null };

export type DeleteExistingMarksMutationVariables = Exact<{
  student_id: Scalars['Int']['input'];
  subject_id: Scalars['Int']['input'];
  exam_id: Scalars['Int']['input'];
}>;


export type DeleteExistingMarksMutation = { __typename?: 'mutation_root', delete_marks?: { __typename?: 'marks_mutation_response', affected_rows: number } | null };

export type GetAdminByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetAdminByEmailQuery = { __typename?: 'query_root', admins: Array<{ __typename?: 'admins', id: number, school_name: string, email: string, password_hash: string, phone?: string | null }> };

export type GetTeacherByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetTeacherByEmailQuery = { __typename?: 'query_root', teachers: Array<{ __typename?: 'teachers', id: number, name: string, email: string, password_hash?: string | null, phone?: string | null }> };

export type GetParentByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetParentByEmailQuery = { __typename?: 'query_root', parents: Array<{ __typename?: 'parents', id: number, name: string, email: string, password_hash?: string | null, phone?: string | null }> };

export type GetStudentByAdmissionNumberQueryVariables = Exact<{
  admissionNumber: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type GetStudentByAdmissionNumberQuery = { __typename?: 'query_root', students: Array<{ __typename?: 'students', id: number, name: string, admission_no: string }> };

export type InsertStudentsMutationVariables = Exact<{
  list: Array<Students_Insert_Input> | Students_Insert_Input;
}>;


export type InsertStudentsMutation = { __typename?: 'mutation_root', insert_students?: { __typename?: 'students_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'students', id: number, admission_no: string }> } | null };

export type InsertTeachersMutationVariables = Exact<{
  list: Array<Teachers_Insert_Input> | Teachers_Insert_Input;
}>;


export type InsertTeachersMutation = { __typename?: 'mutation_root', insert_teachers?: { __typename?: 'teachers_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'teachers', id: number }> } | null };


export const InsertAdminDocument = gql`
    mutation InsertAdmin($school: String!, $email: String!, $pass: String!, $phone: String) {
  insert_admins_one(
    object: {school_name: $school, email: $email, password_hash: $pass, phone: $phone}
  ) {
    id
  }
}
    `;
export const InsertClassSectionDocument = gql`
    mutation InsertClassSection($object: class_sections_insert_input!) {
  insert_class_sections_one(
    object: $object
    on_conflict: {constraint: class_sections_class_name_section_name_key, update_columns: [class_name]}
  ) {
    id
  }
}
    `;
export const GetStudentByIdDocument = gql`
    query GetStudentById($id: Int!) {
  students_by_pk(id: $id) {
    id
    name
    admission_no
    parent_id
    marks {
      id
      subject {
        name
      }
      marks_obtained
      max_marks
    }
  }
}
    `;
export const GetStudentsByParentIdDocument = gql`
    query GetStudentsByParentId($parentId: Int!) {
  students(where: {parent_id: {_eq: $parentId}}) {
    id
    name
    admission_no
    parent_id
    marks {
      id
      subject {
        name
      }
      marks_obtained
      max_marks
    }
  }
}
    `;
export const GetTeacherIdByEmailDocument = gql`
    query GetTeacherIdByEmail($email: String!) {
  teachers(where: {email: {_eq: $email}}) {
    id
    email
    name
  }
}
    `;
export const SelectAdminByEmailDocument = gql`
    query SelectAdminByEmail($email: String!) {
  admins(where: {email: {_eq: $email}}) {
    id
    school_name
    password_hash
  }
}
    `;
export const SelectStudentByDetailsDocument = gql`
    query SelectStudentByDetails($admission_no: String!, $name: String!) {
  students(where: {admission_no: {_eq: $admission_no}, name: {_ilike: $name}}) {
    id
    name
  }
}
    `;
export const SelectTeacherByEmailDocument = gql`
    query SelectTeacherByEmail($email: String!) {
  teachers(where: {email: {_eq: $email}}) {
    id
    name
    email
    password_hash
  }
}
    `;
export const SelectParentByEmailDocument = gql`
    query SelectParentByEmail($email: String!) {
  parents(where: {email: {_eq: $email}}) {
    id
    name
    email
    password_hash
  }
}
    `;
export const InsertMarksDocument = gql`
    mutation InsertMarks($objects: [marks_insert_input!]!) {
  insert_marks(objects: $objects) {
    affected_rows
    returning {
      id
      student_id
      marks_obtained
      max_marks
      grade
      remarks
    }
  }
}
    `;
export const GetStudentsByClassSectionDocument = gql`
    query GetStudentsByClassSection($class_name: String!, $section_name: String!) {
  students(
    where: {class_section: {class_name: {_eq: $class_name}, section_name: {_eq: $section_name}}, is_active: {_eq: true}}
    order_by: {name: asc}
  ) {
    id
    admission_no
    name
    dob
    gender
  }
}
    `;
export const FindClassSectionDocument = gql`
    query FindClassSection($class_name: String!, $section_name: String!) {
  class_sections(
    where: {class_name: {_eq: $class_name}, section_name: {_eq: $section_name}}
  ) {
    id
    class_name
    section_name
    display_name
  }
}
    `;
export const FindSubjectDocument = gql`
    query FindSubject($name: String!, $class_name: String!) {
  subjects(where: {name: {_eq: $name}, class_name: {_eq: $class_name}}) {
    id
    name
    class_name
    teacher_id
  }
}
    `;
export const FindExamDocument = gql`
    query FindExam($name: String!, $academic_year: String!) {
  exams(where: {name: {_eq: $name}, academic_year: {_eq: $academic_year}}) {
    id
    name
    academic_year
    start_date
    end_date
  }
}
    `;
export const GetExistingMarksDocument = gql`
    query GetExistingMarks($student_ids: [Int!]!, $subject_id: Int!, $exam_id: Int!) {
  marks(
    where: {student_id: {_in: $student_ids}, subject_id: {_eq: $subject_id}, exam_id: {_eq: $exam_id}}
  ) {
    id
    student_id
    marks_obtained
    max_marks
    grade
    remarks
    is_finalized
  }
}
    `;
export const UpsertClassSectionDocument = gql`
    mutation UpsertClassSection($class_name: String!, $section_name: String!) {
  insert_class_sections_one(
    object: {class_name: $class_name, section_name: $section_name}
    on_conflict: {constraint: class_sections_class_name_section_name_key, update_columns: []}
  ) {
    id
    class_name
    section_name
    display_name
  }
}
    `;
export const CreateSubjectDocument = gql`
    mutation CreateSubject($name: String!, $class_name: String!, $teacher_id: Int!) {
  insert_subjects_one(
    object: {name: $name, class_name: $class_name, teacher_id: $teacher_id}
  ) {
    id
    name
    class_name
  }
}
    `;
export const CreateExamDocument = gql`
    mutation CreateExam($name: String!, $academic_year: String!) {
  insert_exams_one(object: {name: $name, academic_year: $academic_year}) {
    id
    name
    academic_year
  }
}
    `;
export const FinalizeMarksDocument = gql`
    mutation FinalizeMarks($subject_id: Int!, $exam_id: Int!, $student_ids: [Int!]!) {
  update_marks(
    where: {subject_id: {_eq: $subject_id}, exam_id: {_eq: $exam_id}, student_id: {_in: $student_ids}}
    _set: {is_finalized: true}
  ) {
    affected_rows
    returning {
      id
      student_id
      is_finalized
    }
  }
}
    `;
export const DeleteExistingMarksDocument = gql`
    mutation DeleteExistingMarks($student_id: Int!, $subject_id: Int!, $exam_id: Int!) {
  delete_marks(
    where: {student_id: {_eq: $student_id}, subject_id: {_eq: $subject_id}, exam_id: {_eq: $exam_id}}
  ) {
    affected_rows
  }
}
    `;
export const GetAdminByEmailDocument = gql`
    query GetAdminByEmail($email: String!) {
  admins(where: {email: {_eq: $email}}, limit: 1) {
    id
    school_name
    email
    password_hash
    phone
  }
}
    `;
export const GetTeacherByEmailDocument = gql`
    query GetTeacherByEmail($email: String!) {
  teachers(where: {email: {_eq: $email}}, limit: 1) {
    id
    name
    email
    password_hash
    phone
  }
}
    `;
export const GetParentByEmailDocument = gql`
    query GetParentByEmail($email: String!) {
  parents(where: {email: {_eq: $email}}, limit: 1) {
    id
    name
    email
    password_hash
    phone
  }
}
    `;
export const GetStudentByAdmissionNumberDocument = gql`
    query GetStudentByAdmissionNumber($admissionNumber: String!, $name: String!) {
  students(
    where: {admission_no: {_eq: $admissionNumber}, name: {_eq: $name}}
    limit: 1
  ) {
    id
    name
    admission_no
  }
}
    `;
export const InsertStudentsDocument = gql`
    mutation InsertStudents($list: [students_insert_input!]!) {
  insert_students(
    objects: $list
    on_conflict: {constraint: students_admission_no_key, update_columns: [name, gender, dob, class_section_id, created_by_admin_id]}
  ) {
    affected_rows
    returning {
      id
      admission_no
    }
  }
}
    `;
export const InsertTeachersDocument = gql`
    mutation InsertTeachers($list: [teachers_insert_input!]!) {
  insert_teachers(objects: $list) {
    affected_rows
    returning {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    InsertAdmin(variables: InsertAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<InsertAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertAdminMutation>({ document: InsertAdminDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InsertAdmin', 'mutation', variables);
    },
    InsertClassSection(variables: InsertClassSectionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<InsertClassSectionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertClassSectionMutation>({ document: InsertClassSectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InsertClassSection', 'mutation', variables);
    },
    GetStudentById(variables: GetStudentByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStudentByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStudentByIdQuery>({ document: GetStudentByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetStudentById', 'query', variables);
    },
    GetStudentsByParentId(variables: GetStudentsByParentIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStudentsByParentIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStudentsByParentIdQuery>({ document: GetStudentsByParentIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetStudentsByParentId', 'query', variables);
    },
    GetTeacherIdByEmail(variables: GetTeacherIdByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetTeacherIdByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTeacherIdByEmailQuery>({ document: GetTeacherIdByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetTeacherIdByEmail', 'query', variables);
    },
    SelectAdminByEmail(variables: SelectAdminByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SelectAdminByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SelectAdminByEmailQuery>({ document: SelectAdminByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SelectAdminByEmail', 'query', variables);
    },
    SelectStudentByDetails(variables: SelectStudentByDetailsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SelectStudentByDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SelectStudentByDetailsQuery>({ document: SelectStudentByDetailsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SelectStudentByDetails', 'query', variables);
    },
    SelectTeacherByEmail(variables: SelectTeacherByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SelectTeacherByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SelectTeacherByEmailQuery>({ document: SelectTeacherByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SelectTeacherByEmail', 'query', variables);
    },
    SelectParentByEmail(variables: SelectParentByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SelectParentByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SelectParentByEmailQuery>({ document: SelectParentByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SelectParentByEmail', 'query', variables);
    },
    InsertMarks(variables: InsertMarksMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<InsertMarksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertMarksMutation>({ document: InsertMarksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InsertMarks', 'mutation', variables);
    },
    GetStudentsByClassSection(variables: GetStudentsByClassSectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStudentsByClassSectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStudentsByClassSectionQuery>({ document: GetStudentsByClassSectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetStudentsByClassSection', 'query', variables);
    },
    FindClassSection(variables: FindClassSectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FindClassSectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindClassSectionQuery>({ document: FindClassSectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FindClassSection', 'query', variables);
    },
    FindSubject(variables: FindSubjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FindSubjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindSubjectQuery>({ document: FindSubjectDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FindSubject', 'query', variables);
    },
    FindExam(variables: FindExamQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FindExamQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindExamQuery>({ document: FindExamDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FindExam', 'query', variables);
    },
    GetExistingMarks(variables: GetExistingMarksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetExistingMarksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExistingMarksQuery>({ document: GetExistingMarksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetExistingMarks', 'query', variables);
    },
    UpsertClassSection(variables: UpsertClassSectionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpsertClassSectionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertClassSectionMutation>({ document: UpsertClassSectionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpsertClassSection', 'mutation', variables);
    },
    CreateSubject(variables: CreateSubjectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateSubjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSubjectMutation>({ document: CreateSubjectDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateSubject', 'mutation', variables);
    },
    CreateExam(variables: CreateExamMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateExamMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateExamMutation>({ document: CreateExamDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateExam', 'mutation', variables);
    },
    FinalizeMarks(variables: FinalizeMarksMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FinalizeMarksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FinalizeMarksMutation>({ document: FinalizeMarksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FinalizeMarks', 'mutation', variables);
    },
    DeleteExistingMarks(variables: DeleteExistingMarksMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteExistingMarksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExistingMarksMutation>({ document: DeleteExistingMarksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteExistingMarks', 'mutation', variables);
    },
    GetAdminByEmail(variables: GetAdminByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetAdminByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAdminByEmailQuery>({ document: GetAdminByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetAdminByEmail', 'query', variables);
    },
    GetTeacherByEmail(variables: GetTeacherByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetTeacherByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTeacherByEmailQuery>({ document: GetTeacherByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetTeacherByEmail', 'query', variables);
    },
    GetParentByEmail(variables: GetParentByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetParentByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetParentByEmailQuery>({ document: GetParentByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetParentByEmail', 'query', variables);
    },
    GetStudentByAdmissionNumber(variables: GetStudentByAdmissionNumberQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStudentByAdmissionNumberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStudentByAdmissionNumberQuery>({ document: GetStudentByAdmissionNumberDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetStudentByAdmissionNumber', 'query', variables);
    },
    InsertStudents(variables: InsertStudentsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<InsertStudentsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertStudentsMutation>({ document: InsertStudentsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InsertStudents', 'mutation', variables);
    },
    InsertTeachers(variables: InsertTeachersMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<InsertTeachersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertTeachersMutation>({ document: InsertTeachersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InsertTeachers', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;