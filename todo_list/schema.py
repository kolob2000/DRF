import graphene
from django.shortcuts import get_object_or_404
from graphene_django import DjangoObjectType
from todoapp.models import ToDo, Project
from userapp.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.String())

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_todo_by_id(root, info, id):
        return get_object_or_404(TodoType, id=id)

    all_project = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.String())

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_project_by_id(root, info, id):
        return get_object_or_404(Project, id=id)

    all_user = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.String())

    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_user_by_id(root, info, id):
        return get_object_or_404(User, id=id)


class TodoMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, title, id):
        todo = ToDo.objects.get(id=id)
        todo.title = title
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
