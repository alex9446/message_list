from os import environ as environment_variables
from sys import argv

# PARAMETERS SCHEME
# 'parameter_name': [
#     ['--cli-argument', ...],
#     ['ENVIRONMENT_VARIABLE', ...],
#     'default value'
# ]

PARAMETERS = {
    'allowed_cors': [
        ['--allowed-cors'],
        ['ALLOWED_CORS', 'ML_CORS'],
        ''
    ],
    'database_url': [
        ['--database-url'],
        ['DATABASE_URL', 'ML_DB_URL'],
        'sqlite:///db.sqlite'
    ],
    'port': [
        ['--port'],
        ['PORT', 'ML_PORT'],
        '8080'
    ],
    'redirect_url': [
        ['--redirect-url'],
        ['REDIRECT_URL'],
        ''
    ]
}


# Retrieve the best parameter with this priority:
# arguments, environment variables, default value
def get_parameter(name: str):
    parameter = PARAMETERS[name]
    for arg in parameter[0]:
        if arg in argv:
            try:
                return argv[argv.index(arg)+1]
            except IndexError:
                pass
    for env in parameter[1]:
        if env in environment_variables:
            return environment_variables[env]
    return parameter[2]
